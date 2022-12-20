import Beagleroy, { create } from 'stores/BeagleRoy';
import cookies from 'cookiesjs';

const saveAsCookie = allData => {
  cookies({ general: allData });
};

class GeneralStore extends Beagleroy {
  updateExtraPayment(amount) {
    this.then({ extraPayment: amount });
    this.meanwhile(saveAsCookie);
  }
}

export default create(GeneralStore, cookies('general') || { extraPayment: 0 });
