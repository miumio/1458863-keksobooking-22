import {createObject} from './data.js';

const createObjectList = new Array(10).fill(null).map(() => createObject());
createObjectList;
// console.log(createObjectList);
