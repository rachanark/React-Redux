/*export const GET_MASTER_DATA="http://acinventory-204612.appspot.com/rest/getMasterData";
export const SAVE_MASTER_DATA="http://acinventory-204612.appspot.com/rest/saveMasterData";
export const GET_CATEGORY_TREE="http://acinventory-204612.appspot.com/rest/getCategoryTree";
export const GET_PRODUCT ="http://acinventory-204612.appspot.com/rest/getProduct";
export const UPDATE_PRODUCT ="http://acinventory-204612.appspot.com/rest/updateProduct";
export const SAVE_PRODUCT="http://acinventory-204612.appspot.com/rest/createProduct";
export const CREATE_CATEGORY = "http://acinventory-204612.appspot.com/rest/createCategory";
export const REMOVE_CATEGORY = "http://acinventory-204612.appspot.com/rest/removeCategory";//not available
export const EDIT_CATEGORY="http://acinventory-204612.appspot.com/rest/editCategory";//not available*/
const baseUrl = 'http://arunacreations.ap-southeast-1.elasticbeanstalk.com/rest/';
//const baseUrl = 'http://acinventory-204612.appspot.com/rest/';

export const GET_PRODUCT_LIST = baseUrl + "getProducts/";
export const GET_MASTER_DATA = baseUrl + "getMasterData";
export const SAVE_MASTER_DATA = baseUrl + "saveMasterData";
export const GET_CATEGORY_TREE = baseUrl + "getCategoryTree";
export const GET_PRODUCT = baseUrl + "getProduct";
export const UPDATE_PRODUCT = baseUrl + "updateProduct";
export const SAVE_PRODUCT = baseUrl + "createProduct";
export const CREATE_CATEGORY = baseUrl + "createCategory";
export const REMOVE_CATEGORY = baseUrl + "deleteCategory";//not available
export const EDIT_CATEGORY = baseUrl + "updateCategory";//not available
export const UPLOAD_IMAGE=baseUrl + "uploadImage";//not available