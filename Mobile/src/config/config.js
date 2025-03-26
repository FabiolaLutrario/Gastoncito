import * as Updates from 'expo-updates';

const ENTORNO_EXPO_UPDATES = (Updates.channel !== null && Updates.channel !== undefined && Updates.channel !== "")? Updates.channel : 'test';
const ENTORNO_EXPO_LOCAL = process.env.APP_ENV || 'test';

// expo local means that the build for android or iOS is done locally and not with eas build
const IS_LOCAL_BUILD = process.env.APP_EXPO_LOCAL === 'true';

export const ENTORNO = IS_LOCAL_BUILD ? ENTORNO_EXPO_LOCAL : ENTORNO_EXPO_UPDATES;
//export const ENTORNO = 'local';

const local = {
    url: 'http://192.0.99.127', 
    port: '3000',
    realTimeServerUrl :'http://192.0.99.127',
    realTimeServerPort : '3000'
}

export function getRealTimeServerURL(){
    
    switch(ENTORNO){
        case 'local':
            return `${local.realTimeServerUrl}:${local.realTimeServerPort}/`;
            break;
    }
}

export function getServerURL(){

    switch(ENTORNO){
        case 'local':
            return `${local.url}:${local.port}/api`;
            break;
    }
}