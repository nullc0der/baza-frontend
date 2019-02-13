import React from 'react'

const SVGTemplate = ({ id, semiCircleColor, textColor, imageData }) => (
    <svg id={id} className='svg-template-image' width="129px" height="128px" viewBox="0 0 129 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs></defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ImageTemplate" transform="translate(-3.000000, 0.000000)">
                <g id="imageGroup" transform="translate(4.000000, 0.000000)">
                    <image id="Bitmap" x="0" y="0" width="128" height="128" xlinkHref={imageData} />
                </g>
                <g id="outerContainer" transform="translate(3.000000, 0.000000)" fill="transparent" fillRule="nonzero">
                    <path d="M64.86,128 L0.86,128 L0.86,64 C0.86,99.346224 29.513776,128 64.86,128 Z" id="Shape"></path>
                    <path d="M0.86,64 L0.86,0 L64.86,0 C29.513776,-2.164332e-15 0.86,28.653776 0.86,64 Z" id="Shape"></path>
                    <path d="M128.86,0 L128.86,64 C128.86,28.653776 100.206224,2.164332e-15 64.86,0 L128.86,0 Z" id="Shape"></path>
                    <path d="M128.86,64 L128.86,128 L64.86,128 C100.206224,128 128.86,99.346224 128.86,64 Z" id="Shape"></path>
                </g>
                <path d="M108.86,64 C108.86,86.6436747 90.5036747,105 67.86,105 C45.2163253,105 26.86,86.6436747 26.86,64 L3.86,64 C3.86,99.346224 32.513776,128 67.86,128 C103.206224,128 131.86,99.346224 131.86,64 L108.86,64 Z" id="semiCircle" fill={semiCircleColor} fillRule="nonzero"></path>
                <g id="text" transform="translate(0.000000, 63.000000)" fill={textColor} fontFamily="Raleway-Bold, Raleway" fontSize="22" fontWeight="bold">
                    <g id="#" transform="translate(15.599455, 12.442278) rotate(76.660751) translate(-15.599455, -12.442278) translate(7.099455, -1.057722)">
                        <text>
                            <tspan x="0.11262279" y="21.534036">#</tspan>
                        </text>
                    </g>
                    <g id="B" transform="translate(22.182548, 27.236382) rotate(59.331073) translate(-22.182548, -27.236382) translate(14.182548, 13.736382)">
                        <text>
                            <tspan x="0.3238832" y="21.5284354">B</tspan>
                        </text>
                    </g>
                    <g id="a" transform="translate(31.262372, 38.444931) rotate(43.550000) translate(-31.262372, -38.444931) translate(24.262372, 24.944931)">
                        <text>
                            <tspan x="0.2001137" y="21.8008698">a</tspan>
                        </text>
                    </g>
                    <g id="s" transform="translate(41.101479, 46.014348) rotate(30.250000) translate(-41.101479, -46.014348) translate(35.101479, 32.514348)">
                        <text>
                            <tspan x="0.9491338" y="21.444897">s</tspan>
                        </text>
                    </g>
                    <g id="i" transform="translate(49.485060, 49.486917) rotate(20.730000) translate(-49.485060, -49.486917) translate(45.985060, 35.986917)">
                        <text>
                            <tspan x="0.0282938" y="21.4526169">i</tspan>
                        </text>
                    </g>
                    <g id="c" transform="translate(58.912430, 52.550140) rotate(10.310000) translate(-58.912430, -52.550140) translate(51.912430, 39.050140)">
                        <text>
                            <tspan x="0.1783262" y="21.0397303">c</tspan>
                        </text>
                    </g>
                    <g id="I" transform="translate(67.992228, 52.506321) rotate(-0.930000) translate(-67.992228, -52.506321) translate(63.992228, 39.006321)">
                        <text>
                            <tspan x="0.8855393" y="21.9819862">I</tspan>
                        </text>
                    </g>
                    <g id="n" transform="translate(78.454882, 51.575315) rotate(-11.534621) translate(-78.454882, -51.575315) translate(70.954882, 38.075315)">
                        <text>
                            <tspan x="0.8488889" y="21.7610148">n</tspan>
                        </text>
                    </g>
                    <g id="c" transform="translate(91.145506, 47.574017) rotate(-26.140000) translate(-91.145506, -47.574017) translate(84.145506, 34.074017)">
                        <text>
                            <tspan x="0.7321654" y="21.2236269">c</tspan>
                        </text>
                    </g>
                    <g id="o" transform="translate(102.434518, 40.244140) rotate(-40.539152) translate(-102.434518, -40.244140) translate(94.934518, 26.744140)">
                        <text>
                            <tspan x="0.1205037" y="21.4607251">o</tspan>
                        </text>
                    </g>
                    <g id="m" transform="translate(113.993154, 26.951652) rotate(-59.450000) translate(-113.993154, -26.951652) translate(102.993154, 13.451652)">
                        <text>
                            <tspan x="0.892091" y="21.7318206">m</tspan>
                        </text>
                    </g>
                    <g id="e" transform="translate(119.125501, 10.173933) rotate(-78.465379) translate(-119.125501, -10.173933) translate(111.625501, -3.326067)">
                        <text>
                            <tspan x="0.111684" y="21.5662903">e</tspan>
                        </text>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)

export default SVGTemplate
