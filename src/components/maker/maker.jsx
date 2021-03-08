import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService,FileInput}) => {
    const [cards, setCards] = useState({
        '1': {
            id:'1',
            name:'HaeYoung',
            company:'Front-end',
            theme:'dark',
            title:'Software Engineer',
            email:'godud5136@gmail.com',
            message:'go for it',
            fileName:'haeyoung',
            fileURL:null
        },
        '2': {
            id:'2',
            name:'HaeYoung',
            company:'Front-end',
            theme:'light',
            title:'Software Engineer',
            email:'godud5136@gmail.com',
            message:'go for it',
            fileName:'haeyoung',
            fileURL:null
        },
        '3': {
            id:'3',
            name:'HaeYoung',
            company:'Front-end',
            theme:'colorful',
            title:'Software Engineer',
            email:'godud5136@gmail.com',
            message:'go for it',
            fileName:'haeyoung',
            fileURL:null
        }
    });
    
    const history = useHistory();
    const onLogout = () => {
        authService.logout();
    };
    
    useEffect(() => {
        authService.onAuthChange(user => {
            // 사용자가 없을 때
            if(!user) {
                history.push('/');
            }
        });
    })
    
    // 💡 방법 2. (이전의 것을 받아온 뒤, 새로운 값을 리턴하도록.)
    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card; 
            return updated;
        });
    }

    /* 
        💡 방법 1.
        const updateCard = (card) => {
            const updated = {...cards};
            updated[card.id] = card; //updated[key] 즉 value를 card로 업데이트 할 것.
            setCards(updated);
        }
    */

    const deleteCard = (card) => {
        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id]
            return updated;
        });
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput={FileInput}
                    cards={cards} 
                    addCard={createOrUpdateCard}
                    updateCard={createOrUpdateCard}
                    deleteCard={deleteCard}    
                />
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
};

export default Maker;