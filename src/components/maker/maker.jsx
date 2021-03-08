import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService,FileInput,cardRepository}) => {
    const history = useHistory();
    const historyState = history?.location?.state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);
    
    const onLogout = () => {
        authService.logout();
    };
    
    // 💡 useEffect의 장점 : 해당하는 로직 별로 여러 개를 만들 수 있다.
    // mount가 되었을 때 + 사용자의 아이디가 바뀔 때마다 쓸 것.
    useEffect(() => {
        if(!userId) {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        })

        // unmount
        return () => stopSync()
    }, [userId]);
    // return stopSync() 그렇게 하시면 useEffect가 실행되는 순간, 
    // return stopSync() 이 줄의 코드가 실행되는 순간,
    // stopSync가 실행이 되기 때문에 더이상 sync가 이뤄지지 않아요 :)
    // useEffect return에서는 항상 function을 리턴해 주어야 한답니다.


    useEffect(() => {
        authService.onAuthChange(user => {
            if(user) {
                // 사용자 있을 때
                setUserId(user.uid);
            } else {
                // 사용자 없을 때
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
        cardRepository.saveCard(userId, card);
    };

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
        cardRepository.removeCard(userId, card);
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