var getSchemaDef = ()=> {
    return {
        name:{
            type: String,
            trim: true,
            unique: true
        },
        thumb:{
            type: String,
            trim: true
        },
        url:{
            type: String,
            trim: true
        },
        check:{
            type: Boolean,
            default: false
        }
    };
};

var getSchema = (mongoose) => {
    var AssetSchema = new mongoose.Schema(getSchemaDef(), {timestamp:true});
    return AssetSchema;
};

module.exports = {getSchema};