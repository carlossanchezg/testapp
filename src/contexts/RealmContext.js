import {createContext} from 'react';

const RealmContext = createContext({
    realmApp: null,
    setRealmApp: _ => {},
    realm: null,
    setRealm: _ => {}
});

export default RealmContext;
