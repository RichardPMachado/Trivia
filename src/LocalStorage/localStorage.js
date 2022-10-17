const RANKING = 'RANKING';
// if (!JSON.parse(localStorage.getItem(RANKING))) {
//   localStorage.setItem(RANKING, JSON.stringify([]));
// }

const readRanking = () => JSON.parse(localStorage.getItem(RANKING));

const saveProductItems = (saveRanking) => localStorage
  .setItem(RANKING, JSON.stringify(saveRanking));

const addRanking = (position) => {
  if (position) {
    const PrevRanking = readRanking();
    if (!PrevRanking) {
      const test = [position];
      saveProductItems(test);
    } else {
      const totalRanking = [...PrevRanking, position];
      const test = totalRanking.sort((a, b) => b.score - a.score);
      saveProductItems(test);
    }
  }
};

export default addRanking;
