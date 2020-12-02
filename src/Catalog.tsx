import React, { useEffect, useState } from 'react';

interface CatalogFile {
    title: string;
    url: string;
}

interface CatalogIndex {
    title: string;
    files: Array<CatalogFile>;
    directories: Array<string>;
}

interface CatalogProps {
    indexFileDir: string;
}

function Catalog(props: CatalogProps) {
    const [indexData, setIndexData] = useState<CatalogIndex>({
        title: "", files: [{ title: "", url: "" }], directories: [""]
    });

    useEffect(
        () => {
            if(indexData.title !== "") return;
            fetch(props.indexFileDir + "/indexfile.json")
                .then(resp => resp.json())
                .then(data => setIndexData(data))
                .catch(err => console.log(JSON.stringify(err)))
        }
    );

    const files: Array<JSX.Element> = indexData.files.map(
        (file) => {
            if (file.title === "") {
                return <div key={file.url}></div>
            }
            else {
                return <li key={file.url}>
                    <a href={file.url}>{file.title}</a>
                </li>
            }
        }
    );

    const directories: Array<JSX.Element> = indexData.directories.map(
        (dir) => {
            if (dir !== "") {
                return <Catalog indexFileDir={props.indexFileDir+"/"+dir} key={props.indexFileDir+dir}/>
            }
            else return <div key={props.indexFileDir+dir}></div>
        }
    );

    return (
        <div>
            <div className="leader" key={props.indexFileDir+indexData.title}>{indexData.title}</div>
            <ul>
                {files}
            </ul>
            {directories}
        </div>
    );
}

export default Catalog;