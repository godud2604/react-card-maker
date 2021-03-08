import React from 'react';
import Card from '../card/card';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditorForm from '../card_editor_form/card_editor_form';
import styles from './editor.module.css'

const Editor = ({FileInput,cards, addCard, updateCard, deleteCard}) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {/* 배열로 이용해도 되는데, 배열이 많아질수루록 맵핑할 때 시간이 오래 걸릴 수 있으니 Object를 이용해서 빠르게 업데이트 할 수 있다. */}
        {
            Object.keys(cards).map(key => (
                <CardEditorForm 
                    key={key} 
                    FileInput={FileInput}
                    card={cards[key]} 
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                />
            ))
        }
        <CardAddForm FileInput={FileInput} onAdd={addCard}/>
    </section>
);

export default Editor;