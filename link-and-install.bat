call yarn unlink
cd example
call yarn unlink "@reactiff/app-data-client"

cd..

call yarn link
call yarn install

cd example
call yarn link "@reactiff/app-data-client"
call yarn install

cd..