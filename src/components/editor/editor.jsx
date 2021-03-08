import React from 'react';
import Card from '../card/card';
import CardEditorForm from '../card_editor_form/card_editor_form';
import styles from './editor.module.css'

const Editor = ({cards}) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {
            cards.map(card => (
                <CardEditorForm card={card} />
            ))
        }
    </section>
);

export default Editor;