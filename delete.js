//删除打包生成的文件
const fs = require("fs");
const path = './dist';
const deleteFile = (path) => {
    if(fs.existsSync(path)){
        const files = fs.readdirSync(path);
        if(files.length > 0){
            console.log(1)
            files.forEach((item,index)=>{
                const filePath = path + '/' + item;
                if(fs.statSync(filePath).isDirectory()){
                    deleteFile(filePath);
                }else{
                    fs.unlinkSync(filePath);
                }
            })
        }else{
            console.log('打包文件已经清空');
        }
        
    }else{
        console.log('路径错误');
    }
}

// 函数运行
deleteFile(path);
