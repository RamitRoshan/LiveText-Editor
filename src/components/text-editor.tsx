import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import 'react-quill/dist/quill.snow.css';
import "../App.css";
import { onSnapshot } from "firebase/firestore";
import { throttle} from "lodash";

export const TextEditor = () => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const isLocalChange = useRef(false);

    const documentRef = doc(db, "documents", "sample-doc");

    const saveContent = throttle(() => {
        //if quillref.current is true
        if(quillRef.current && isLocalChange.current){
            const content = quillRef.current.getEditor().getContents();
            console.log(`Saving content to db: `, content);

            setDoc(documentRef, {content: content.ops}, {merge: true})
             .then(() =>console.log("Content save"))
             .catch(console.error);
            isLocalChange.current = false; 
        }

        //throttle- Ensures saving to Firestore (or database) happens at most once every 1000ms (1 second), even if the user keeps typing.
    }, 1000);

    useEffect(()=> {
        if(quillRef.current){
            //Load initial content from Firestore DB

            getDoc(documentRef)
            .then((docSnap) =>{
                if(docSnap.exists()){
                    const savedContent = docSnap.data().content;
                    if(savedContent){
                        quillRef.current.getEditor().setContents(savedContent);
                    }
                } else{
                    console.log("No doc found, starting with an empty editor.");
                }
            })
            .catch(console.error);

            //Listen to Firestore for any updates and update locally in real-time(if we checked in 2 browser at same time)
            //onSnapshot fn from firestore
            const unsubscribe = onSnapshot(documentRef, (snapshot) => {
                if(snapshot.exists()) {
                    const newContent = snapshot.data().content

                    //if user is not editing / or typing
                    if(!isEditing){
                        const editor = quillRef.current.getEditor()
                        const currentCursorPosition = editor.getSelection()?.index || 0

                        editor.setContents(newContent, "silent");
                        editor.setSelection(currentCursorPosition);

                    }
                }

            })

            // Listen for Local text changes and save it to Firestore
            const editor = quillRef.current.getEditor();
            editor.on("text-change", (delta: any, oldDelta: any, source: any)=> {
                if(source === "user"){
                isLocalChange.current = true;
                 setIsEditing(true)
                 saveContent();

                 setTimeout(() => setIsEditing(false),5000);
                }
            });


            // Cleanup to prevent memory leaks & duplicate event triggers
           // - unsubscribe(): Stops external subscriptions
          // - editor.off("text-change"): Removes event listener
         // Ensures only one active listener & avoids unnecessary event calls

            return() => {
                unsubscribe()
                editor.off("text-change");
            }
        }
    }, []);

    return(
    <div className="google-docs-editor">
        <ReactQuill ref={quillRef}/>
    </div>
    );  
};