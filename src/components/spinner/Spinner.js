const Spinner = ({ style }) => {
    const defaultStyles = {
        margin: '0 auto',
        background: 'none',
        display: 'block',
    };

    const mergedStyles = { ...defaultStyles, ...style };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={mergedStyles} width="177px" height="40px" viewBox="0 0 128 29">
            <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
            <g>
                <path fill="#000000" d="M-75.617,2.175h9.956l-8.533,24.65H-84.15ZM-64.1,4.322h8.345L-62.9,24.678h-8.345Zm11.48,1.527h6.867L-51.636,22.9H-58.5Zm11.386,2.29h4.982l-4.27,12.468H-45.5Zm11.846,2.036h3.634l-3.115,8.906H-32.5Zm11.23,1.781H-16l-1.847,5.089H-20ZM-88.346,4.322H-80l-7.153,20.356H-95.5Zm-12.271,1.527h6.868L-99.636,22.9H-106.5Zm-12.613,2.29h4.982l-4.271,12.468H-117.5Zm-12.155,2.036h3.634l-3.114,8.906H-128.5ZM-6.6,12.973H-5.25L-6.4,16.281H-7.75Zm72.98-10.8h9.956l-8.533,24.65H57.85ZM77.9,4.322h8.345L79.1,24.678H70.751Zm11.48,1.527h6.867L90.364,22.9H83.5Zm11.387,2.29h4.982l-4.271,12.468H96.5Zm11.845,2.036h3.634l-3.114,8.906H109.5Zm11.231,1.781H126l-1.846,5.089H122ZM53.654,4.322H62L54.846,24.678H46.5ZM41.383,5.849h6.867L42.364,22.9H35.5ZM28.77,8.139h4.982l-4.27,12.468H24.5ZM16.616,10.174h3.634L17.135,19.08H13.5Zm118.789,2.8h1.346L135.6,16.281H134.25ZM5.346,11.956H7.5L5.654,17.045H3.5Z" />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="12 0;24 0;36 0;48 0;60 0;72 0;84 0;96 0;108 0;120 0;132 0;144 0"
                    calcMode="discrete"
                    dur="800ms"
                    repeatCount="indefinite"
                />
            </g>
        </svg>
    );
};

export default Spinner;
