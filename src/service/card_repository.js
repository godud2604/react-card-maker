import firebaseApp from './firebase';

class CardRepository {
    syncCards(userId, onUpdate) {
        const ref = firebaseApp.database().ref(`${userId}/cards`);
        // value : 값이 변경될 때마다 알고 싶으니까..
        ref.on('value', snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => ref.off(); // sync 끄고 싶을 때
    }
    saveCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
    }

    removeCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
    }
}

export default CardRepository;