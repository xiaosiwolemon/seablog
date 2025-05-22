import merge from 'easy-pdf-merge';

export function easyPDFmerge({ sourceFiles, outputFile }) {
    merge(sourceFiles, outputFile, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Successfully merged!');
    });
}
