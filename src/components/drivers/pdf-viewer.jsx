import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfComponent = ({ filePath }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const fetchPdf = async () => {
            const loadingTask = pdfjs.getDocument(filePath);

            const pdf = await loadingTask.promise;

            const firstPageNumber = 1;

            const page = await pdf.getPage(firstPageNumber);

            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            const canvas = canvasRef.current;

            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);

            await renderTask.promise;
        };

        fetchPdf();
    }, [filePath]);

    const style = {
        width: "100%"
    };

    return (
        <canvas
            style={style}
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}

PdfComponent.propTypes = {
    filePath: PropTypes.string
};

PdfComponent.defaultProps = {
    filePath: `${process.env.PUBLIC_URL}/sample.pdf`
};

export default PdfComponent;