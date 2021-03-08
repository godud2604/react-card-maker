import React, {useRef} from 'react';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';
import styles from './card_editor_form.module.css';

const CardEditorForm = ({ card, updateCard, deleteCard }) => {
    const nameRef = useRef('');
    const companyRef = useRef('');
    const themeRef = useRef('');
    const titleRef = useRef('');
    const emailRef = useRef('');
    const messageRef = useRef('');

    const {name, company, title, email, message, theme, fileName, fileURL} = card;

    const onChange = (e) => {
        if (e.currentTarget === null) {
            return;
        } 
        e.preventDefault();
        updateCard({
            ...card,
            [e.currentTarget.name] : e.currentTarget.value,
        })
    }
    const onSubmit = () => {
        deleteCard(card);
    };

    return (
        <form className={styles.form}>
            <input
                className={styles.input} 
                type="text"
                name="name"
                value={name} 
                ref={nameRef}
                onChange={onChange}
            />
            <input 
                className={styles.input}
                type="text"
                name="company"
                value={company} 
                ref={companyRef}                 onChange={onChange}

            />
            <select className={styles.select} name="theme" value={theme} ref={themeRef}                 onChange={onChange}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
            </select>
            <input 
                className={styles.input}
                type="text"
                name="title"
                value={title} 
                ref={titleRef}                 onChange={onChange}

            />
            <input 
                className={styles.input}
                type="text"
                name="email"
                value={email} 
                ref={emailRef}                 onChange={onChange}

            />
            <textarea className={styles.textarea} name="message" value={message} ref={messageRef}                 onChange={onChange}></textarea>
            <div className={styles.fileInput}><ImageFileInput/></div>
            <Button name="Delete" onClick={onSubmit}/>
        </form>
    )
}

export default CardEditorForm;