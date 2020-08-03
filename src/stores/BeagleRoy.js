const stores = {};

export default class BeagleRoy {
  connectWith(klass) {
    this.beagleRoy.connections.push(klass);
  }
}

class DataPipeline {
  constructor(store, actionName) {
    this.store = store;
    this.actionName = actionName;
  }

  then(data) {
    const nextMethod =
      'on' + this.actionName.charAt(0).toUpperCase() + this.actionName.slice(1);

    Object.keys(data).forEach(key => {
      this.store.beagleRoy.ammend(key, data[key]);
    });

    this.store.beagleRoy.connections.forEach(connection => {
      if (Boolean(connection[nextMethod])) {
        connection[nextMethod](this.store.beagleRoy.data);
      }
    });
  }

  // I have no idea how to write meanwhile just yet
  async meanwhile(action) {
    return new Promise(async (resolve, fail) => {
      try {
        await resolve(action());
      } catch (e) {
        fail(e);
      }
    });
  }

  get data() {
    return { ...this.store.beagleRoy.data };
  }
}

const attachDataPipeline = store => {
  const knownMethods = Object.getOwnPropertyNames(BeagleRoy.prototype);
  const actionMethods = Object.getOwnPropertyNames(store.constructor.prototype);

  actionMethods.forEach(func => {
    if (!knownMethods.includes[func]) {
      const pipeline = new DataPipeline(store, func);
      store[func] = store[func].bind(pipeline);
    }
  });
};

export const create = (klass, defaultData) => {
  const store = new klass();
  const storeName = store.constructor.name;

  store.beagleRoy = {
    storeName,
    defaultData,
    connections: [],
    keys: Object.keys(defaultData),
    ammend: function(key, value) {
      if (!this.keys.includes(key)) {
        throw new Error(
          `The store ${this.storeName} doesn't have a key of ${key}. ` +
            'Please add it to the default values for this store if this was not ' +
            "by mistake. If you're looking to store wild card data objects you " +
            `can do that at nested levels of the default data. ( eg. { ${key}: ` +
            "{ what: 'ever' } } )"
        );
      }
      this.data[key] = value;
    },
    data: { ...defaultData }
  };
  stores[storeName] = store;

  attachDataPipeline(store);

  return store;
};
