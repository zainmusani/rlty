import FileViewer from "react-native-file-viewer";
import {DocumentDirectoryPath, writeFile} from 'react-native-fs';
import XLSX from 'xlsx';

export function downloadReportsHelper(data, closeBottomSheet, extension = 'xlsx') {
    try {
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "reports");
        const workBookOut = XLSX.write(workBook, {type: 'binary', bookType: extension});
        const localFile = `${DocumentDirectoryPath}/reports.${extension}`;
        writeFile(localFile, workBookOut, 'ascii').then((res) => {
            closeBottomSheet(false);
            setTimeout(() => {
                FileViewer.open(localFile);
            }, 500);
        }).then(() => {
        }).catch((e) => {
            console.log('downloadReportsHelper Error', e);
        });
    } catch (error) {
        console.log('excel error', error);
    }
}
