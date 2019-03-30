import React from 'react'

const SVGTemplate = ({ id, semiCircleColor, textColor, imageData }) => (
    <svg id={id} className='svg-template-image' width="128px" height="128px" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient x1="49.9999956%" y1="28.5381551%" x2="50%" y2="104.247525%" id="linearGradient-1">
                <stop stopColor={semiCircleColor} stopOpacity="0" offset="0%"></stop>
                <stop stopColor={semiCircleColor} stopOpacity="0.1" offset="13.2351127%"></stop>
                <stop stopColor={semiCircleColor} offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ImageTemplate" transform="translate(0.000000, -0.200000)">
                <image id="Bitmap" x="0" y="0" width="128" height="128" xlinkHref={imageData} />
                <g id="outerContainer" fill="transparent" fillRule="nonzero">
                    <path d="M64,128 L0,128 L0,64 C4.21884749e-15,99.346224 28.653776,128 64,128 Z" id="Shape" />
                    <path d="M0,64 L0,0 L64,0 C28.653776,-2.164332e-15 4.21884749e-15,28.653776 0,64 Z" id="Shape" />
                    <path d="M128,0 L128,64 C128,28.653776 99.346224,2.164332e-15 64,0 L128,0 Z" id="Shape" />
                    <path d="M128,64 L128,128 L64,128 C99.346224,128 128,99.346224 128,64 Z" id="Shape" />
                </g>
                <path d="M18.7832411,19.0759912 L35.046706,35.3394561 C27.6047881,42.7619821 23,53.0276723 23,64.3688685 C23,87.0125433 41.3563253,105.368869 64,105.368869 C86.6436747,105.368869 105,87.0125433 105,64.3688685 C105,52.9889546 100.363718,42.6919025 92.8769769,35.2635363 L109.140513,19 C120.789398,30.5906179 128,46.6376801 128,64.3688685 C128,99.7150925 99.346224,128.368869 64,128.368869 C28.653776,128.368869 0,99.7150925 0,64.3688685 C0,46.6763977 7.17914601,30.6607063 18.7832411,19.0759912 Z" id="semiCircle" fill="url(#linearGradient-1)" fillRule="nonzero" />
                <g id="text" transform="translate(3.000000, 66.000000)" fill={textColor}>
                    <path d="M16,8.29577465 L12.8048048,8.29577465 L12.2372372,10.7042254 L14.96997,10.7042254 L14.96997,13.2183099 L11.6276276,13.2183099 L10.7237237,17 L8.03303303,17 L8.95795796,13.2183099 L7.04504505,13.2183099 L6.12012012,17 L3.42942943,17 L4.37537538,13.2183099 L2,13.2183099 L2,10.7042254 L4.96396396,10.7042254 L5.53153153,8.29577465 L3.03003003,8.29577465 L3.03003003,5.97183099 L6.0990991,5.97183099 L7.06606607,2 L9.75675676,2 L8.76876877,5.97183099 L10.7027027,5.97183099 L11.6696697,2 L14.3603604,2 L13.3723724,5.97183099 L16,5.97183099 L16,8.29577465 Z M9.56756757,10.7042254 L10.1351351,8.29577465 L8.2012012,8.29577465 L7.63363363,10.7042254 L9.56756757,10.7042254 Z" id="#" transform="translate(9.000000, 9.500000) rotate(76.660751) translate(-9.000000, -9.500000) " />
                    <path d="M22,28.1549296 C22,28.8028201 21.8597402,29.3661948 21.5792164,29.8450704 C21.2986925,30.3239461 20.9148236,30.7218294 20.427598,31.0387324 C19.9403724,31.3556354 19.371951,31.5950696 18.7223169,31.7570423 C18.0726827,31.9190149 17.3861479,32 16.6626917,32 L9,32 L9,17 L17.7478705,17 C18.2941538,17 18.7887542,17.1126749 19.2316865,17.3380282 C19.6746189,17.5633814 20.0511058,17.855632 20.3611584,18.2147887 C20.6712111,18.5739455 20.9111292,18.9823921 21.0809199,19.4401408 C21.2507107,19.8978896 21.3356048,20.3661948 21.3356048,20.8450704 C21.3356048,21.5633839 21.1473613,22.2394335 20.7708688,22.8732394 C20.3943763,23.5070454 19.829646,23.9859139 19.076661,24.3098592 C19.9772901,24.5633815 20.6896623,25.0140813 21.213799,25.6619718 C21.7379356,26.3098624 22,27.14084 22,28.1549296 Z M18.3015332,27.4577465 C18.3015332,26.9929554 18.1612734,26.5985932 17.8807496,26.2746479 C17.6002257,25.9507026 17.2458852,25.7887324 16.8177172,25.7887324 L12.6320273,25.7887324 L12.6320273,29.0633803 L16.6626917,29.0633803 C17.1351528,29.0633803 17.5264039,28.9154944 17.8364566,28.6197183 C18.1465092,28.3239422 18.3015332,27.9366221 18.3015332,27.4577465 Z M12.6320273,19.9577465 L12.6320273,23.0633803 L16.197615,23.0633803 C16.5962541,23.0633803 16.9505947,22.936621 17.2606474,22.6830986 C17.5707,22.4295762 17.725724,22.0352139 17.725724,21.5 C17.725724,21.0070398 17.5891553,20.6267619 17.3160136,20.3591549 C17.042872,20.091548 16.7143688,19.9577465 16.330494,19.9577465 L12.6320273,19.9577465 Z" id="B" transform="translate(15.500000, 24.500000) rotate(59.331073) translate(-15.500000, -24.500000) " />
                    <path d="M21.0670391,44 C20.4860306,44 19.9459988,43.9082578 19.4469274,43.7247706 C18.947856,43.5412835 18.5195549,43.2844053 18.1620112,42.9541284 C17.8044675,42.6238516 17.5214163,42.2348646 17.3128492,41.787156 C17.104282,41.3394473 17,40.8513788 17,40.3229358 C17,39.7504559 17.1229038,39.2293601 17.3687151,38.759633 C17.6145264,38.2899059 17.9608916,37.8862402 18.4078212,37.5486239 C18.8547508,37.2110075 19.3836096,36.9467899 19.9944134,36.7559633 C20.6052172,36.5651367 21.2830503,36.4697248 22.027933,36.4697248 C22.5195555,36.4697248 22.9962733,36.5100913 23.4581006,36.5908257 C23.9199278,36.67156 24.3221584,36.7926597 24.6648045,36.9541284 L24.6648045,36.4256881 C24.6648045,35.0899016 23.8826894,34.4220183 22.3184358,34.4220183 C21.6778366,34.4220183 21.067042,34.5284393 20.4860335,34.7412844 C19.905025,34.9541295 19.2942304,35.2733924 18.6536313,35.6990826 L17.603352,33.4972477 C18.3780299,32.9981626 19.1824912,32.6238545 20.0167598,32.3743119 C20.8510284,32.1247694 21.7374255,32 22.6759777,32 C24.4487984,32 25.819362,32.4110051 26.7877095,33.2330275 C27.756057,34.05505 28.2402235,35.2587077 28.2402235,36.8440367 L28.2402235,39.8165138 C28.2402235,40.1688091 28.2960888,40.4146782 28.4078212,40.5541284 C28.5195536,40.6935787 28.7169446,40.7779815 29,40.8073394 L29,43.7798165 C28.6871493,43.8532114 28.4040981,43.9009173 28.150838,43.9229358 C27.8975779,43.9449542 27.6666677,43.9559633 27.4581006,43.9559633 C26.7877061,43.9559633 26.2811935,43.8275242 25.9385475,43.5706422 C25.5959015,43.3137602 25.3798887,42.9504611 25.2905028,42.4807339 L25.2234637,41.9522936 C24.7020458,42.6128473 24.0800781,43.1192643 23.3575419,43.4715596 C22.6350057,43.823855 21.8715124,44 21.0670391,44 Z M22.1173184,41.4678899 C22.5046574,41.4678899 22.8808175,41.4018355 23.2458101,41.2697248 C23.6108026,41.137614 23.9124755,40.961469 24.150838,40.7412844 C24.493484,40.4770629 24.6648045,40.1981666 24.6648045,39.9045872 L24.6648045,38.8036697 C24.3519537,38.6862379 24.0130372,38.5944957 23.6480447,38.5284404 C23.2830522,38.462385 22.9441356,38.4293578 22.6312849,38.4293578 C21.9757882,38.4293578 21.4357563,38.5761453 21.0111732,38.8697248 C20.5865901,39.1633042 20.3743017,39.5449518 20.3743017,40.0146789 C20.3743017,40.4403691 20.5381734,40.7889895 20.8659218,41.0605505 C21.1936702,41.3321114 21.6107982,41.4678899 22.1173184,41.4678899 Z" id="a" transform="translate(23.000000, 38.000000) rotate(43.550000) translate(-23.000000, -38.000000) " />
                    <path d="M34.2954048,52 C33.3180112,52 32.3552199,51.8422034 31.4070022,51.5266055 C30.4587845,51.2110076 29.6564584,50.7522966 29,50.1504587 L30.2472648,47.9926606 C30.9474871,48.4770666 31.6294642,48.8513748 32.2932166,49.1155963 C32.956969,49.3798178 33.5951829,49.5119266 34.2078775,49.5119266 C34.6601044,49.5119266 35.0102103,49.4311935 35.2582057,49.2697248 C35.5062011,49.1082561 35.6301969,48.873396 35.6301969,48.5651376 C35.6301969,48.2568792 35.4733787,48.0110101 35.1597374,47.8275229 C34.8460962,47.6440358 34.2954088,47.4495423 33.5076586,47.2440367 C32.7344965,47.0238521 32.0816949,46.8110102 31.5492341,46.6055046 C31.0167734,46.399999 30.582788,46.1724783 30.2472648,45.9229358 C29.9117416,45.6733932 29.6710438,45.3871576 29.5251641,45.0642202 C29.3792845,44.7412828 29.3063457,44.3596352 29.3063457,43.9192661 C29.3063457,43.3321072 29.4230477,42.7963327 29.6564551,42.3119266 C29.8898626,41.8275205 30.210793,41.4165154 30.619256,41.0788991 C31.027719,40.7412827 31.5127616,40.4770652 32.0743982,40.2862385 C32.6360349,40.0954119 33.2450733,40 33.9015317,40 C34.7622217,40 35.5681946,40.11743 36.3194748,40.3522936 C37.070755,40.5871571 37.7964954,41.012841 38.4967177,41.6293578 L37.1400438,43.7431193 C36.4835853,43.2880711 35.9000755,42.9577992 35.3894967,42.7522936 C34.8789179,42.546788 34.3829346,42.4440367 33.9015317,42.4440367 C33.5222446,42.4440367 33.2013142,42.5211001 32.9387309,42.6752294 C32.6761475,42.8293586 32.5448578,43.0752277 32.5448578,43.412844 C32.5448578,43.7357814 32.6870883,43.9779808 32.9715536,44.1394495 C33.2560189,44.3009182 33.7848247,44.4770633 34.5579869,44.6678899 C35.3749129,44.8880745 36.0641839,45.1082558 36.6258206,45.3284404 C37.1874572,45.548625 37.6433243,45.7944941 37.9934354,46.066055 C38.3435466,46.337616 38.5988322,46.6495395 38.7592998,47.0018349 C38.9197674,47.3541302 39,47.7724746 39,48.2568807 C39,49.4018406 38.5769554,50.3119232 37.7308534,50.987156 C36.8847514,51.6623887 35.7396133,52 34.2954048,52 Z" id="s" transform="translate(34.000000, 46.000000) rotate(30.250000) translate(-34.000000, -46.000000) " />
                    <path d="M41,54 L41,42.4931507 L44,42.4931507 L44,54 L41,54 Z M41,41.1780822 L41,38 L44,38 L44,41.1780822 L41,41.1780822 Z" id="i" transform="translate(42.500000, 46.000000) rotate(20.730000) translate(-42.500000, -46.000000) " />
                    <path d="M46,50.9889908 C46,50.1963263 46.1316937,49.4367009 46.3950851,48.7100917 C46.6584764,47.9834826 47.039695,47.3449569 47.5387524,46.7944954 C48.0378097,46.2440339 48.6512251,45.8073411 49.379017,45.4844037 C50.1068089,45.1614663 50.935093,45 51.8638941,45 C53.1254001,45 54.185881,45.282566 55.0453686,45.8477064 C55.9048562,46.4128469 56.5494622,47.1504542 56.979206,48.0605505 L53.7353497,49.0954128 C53.3056059,48.3614642 52.6748624,47.9944954 51.8431002,47.9944954 C51.149965,47.9944954 50.5712059,48.2660523 50.1068053,48.8091743 C49.6424047,49.3522963 49.4102079,50.0788945 49.4102079,50.9889908 C49.4102079,51.444039 49.4725892,51.8587137 49.5973535,52.2330275 C49.7221178,52.6073413 49.895399,52.9266042 50.1172023,53.1908257 C50.3390055,53.4550472 50.5989273,53.6605497 50.8969754,53.8073394 C51.1950235,53.9541292 51.5103953,54.0275229 51.8431002,54.0275229 C52.2589813,54.0275229 52.6401999,53.921102 52.9867675,53.7082569 C53.3333351,53.4954118 53.5897912,53.2201852 53.7561437,52.8825688 L57,53.9394495 C56.5979816,54.8348669 55.9568412,55.5688045 55.0765595,56.1412844 C54.1962779,56.7137643 53.1254001,57 51.8638941,57 C50.9489557,57 50.1276029,56.834864 49.399811,56.5045872 C48.672019,56.1743103 48.055138,55.7339477 47.5491493,55.1834862 C47.0431607,54.6330248 46.6584764,53.994499 46.3950851,53.2678899 C46.1316937,52.5412808 46,51.7816553 46,50.9889908 Z" id="c" transform="translate(51.500000, 51.000000) rotate(10.310000) translate(-51.500000, -51.000000) " />
                    <polygon id="I" transform="translate(61.439407, 50.470325) rotate(-0.930000) translate(-61.439407, -50.470325) " points="59.8793327 57.9422133 60.1227634 42.9461649 62.9995762 42.9928641 62.9995762 57.9928641" />
                    <path d="M78,57 L74.5217391,57 L74.5217391,50.3831776 C74.5217391,49.6056036 74.3804362,49.0411233 74.0978261,48.6897196 C73.815216,48.338316 73.4420313,48.1626168 72.9782609,48.1626168 C72.7318828,48.1626168 72.4855085,48.2149527 72.2391304,48.3196262 C71.9927524,48.4242996 71.7536243,48.5700925 71.5217391,48.7570093 C71.2898539,48.9439262 71.0833342,49.1644847 70.9021739,49.4186916 C70.7210136,49.6728985 70.5797107,49.9495312 70.4782609,50.2485981 L70.4782609,57 L67,57 L67,45.2242991 L70.1304348,45.2242991 L70.1304348,47.1981308 C70.5507267,46.4953236 71.1449237,45.9532729 71.9130435,45.5719626 C72.6811633,45.1906523 73.5652124,45 74.5652174,45 C75.3043515,45 75.8985485,45.1383164 76.3478261,45.4149533 C76.7971037,45.6915902 77.1449263,46.0504651 77.3913043,46.4915888 C77.6376824,46.9327125 77.8007242,47.4149507 77.8804348,47.9383178 C77.9601453,48.4616849 78,48.970091 78,49.4635514 L78,57 Z" id="n" transform="translate(72.500000, 51.000000) rotate(-11.534621) translate(-72.500000, -51.000000) " />
                    <path d="M79,46.9889908 C79,46.1963263 79.1316937,45.4367009 79.3950851,44.7100917 C79.6584764,43.9834826 80.039695,43.3449569 80.5387524,42.7944954 C81.0378097,42.2440339 81.6512251,41.8073411 82.379017,41.4844037 C83.1068089,41.1614663 83.935093,41 84.8638941,41 C86.1254001,41 87.185881,41.282566 88.0453686,41.8477064 C88.9048562,42.4128469 89.5494622,43.1504542 89.979206,44.0605505 L86.7353497,45.0954128 C86.3056059,44.3614642 85.6748624,43.9944954 84.8431002,43.9944954 C84.149965,43.9944954 83.5712059,44.2660523 83.1068053,44.8091743 C82.6424047,45.3522963 82.4102079,46.0788945 82.4102079,46.9889908 C82.4102079,47.444039 82.4725892,47.8587137 82.5973535,48.2330275 C82.7221178,48.6073413 82.895399,48.9266042 83.1172023,49.1908257 C83.3390055,49.4550472 83.5989273,49.6605497 83.8969754,49.8073394 C84.1950235,49.9541292 84.5103953,50.0275229 84.8431002,50.0275229 C85.2589813,50.0275229 85.6401999,49.921102 85.9867675,49.7082569 C86.3333351,49.4954118 86.5897912,49.2201852 86.7561437,48.8825688 L90,49.9394495 C89.5979816,50.8348669 88.9568412,51.5688045 88.0765595,52.1412844 C87.1962779,52.7137643 86.1254001,53 84.8638941,53 C83.9489557,53 83.1276029,52.834864 82.399811,52.5045872 C81.672019,52.1743103 81.055138,51.7339477 80.5491493,51.1834862 C80.0431607,50.6330248 79.6584764,49.994499 79.3950851,49.2678899 C79.1316937,48.5412808 79,47.7816553 79,46.9889908 Z" id="c" transform="translate(84.500000, 47.000000) rotate(-26.140000) translate(-84.500000, -47.000000) " />
                    <path d="M96,46 C95.0462586,46 94.1957333,45.8385337 93.4483986,45.5155963 C92.7010639,45.1926589 92.0711769,44.7559661 91.5587189,44.2055046 C91.0462608,43.6550431 90.6583643,43.0165174 90.3950178,42.2899083 C90.1316713,41.5632991 90,40.8036737 90,40.0110092 C90,39.2183447 90.1316713,38.4587192 90.3950178,37.7321101 C90.6583643,37.005501 91.0462608,36.3669752 91.5587189,35.8165138 C92.0711769,35.2660523 92.7010639,34.8256897 93.4483986,34.4954128 C94.1957333,34.165136 95.0462586,34 96,34 C96.9537414,34 97.800708,34.165136 98.5409253,34.4954128 C99.2811425,34.8256897 99.9074707,35.2660523 100.419929,35.8165138 C100.932387,36.3669752 101.323842,37.005501 101.594306,37.7321101 C101.86477,38.4587192 102,39.2183447 102,40.0110092 C102,40.8036737 101.868329,41.5632991 101.604982,42.2899083 C101.341636,43.0165174 100.953739,43.6550431 100.441281,44.2055046 C99.9288231,44.7559661 99.2989361,45.1926589 98.5516014,45.5155963 C97.8042667,45.8385337 96.9537414,46 96,46 Z M93.5017794,40.0110092 C93.5017794,40.9211055 93.7366525,41.6513734 94.2064057,42.2018349 C94.6761589,42.7522963 95.2740177,43.0275229 96,43.0275229 C96.3558737,43.0275229 96.6832725,42.9541292 96.9822064,42.8073394 C97.2811403,42.6605497 97.5409242,42.4550472 97.7615658,42.1908257 C97.9822075,41.9266042 98.156583,41.6073413 98.2846975,41.2330275 C98.412812,40.8587137 98.4768683,40.4513783 98.4768683,40.0110092 C98.4768683,39.1009129 98.2419952,38.370645 97.772242,37.8201835 C97.3024888,37.269722 96.7117473,36.9944954 96,36.9944954 C95.6441263,36.9944954 95.3131688,37.0678892 95.0071174,37.2146789 C94.7010661,37.3614686 94.4377235,37.5669712 94.2170819,37.8311927 C93.9964402,38.0954142 93.8220647,38.414677 93.6939502,38.7889908 C93.5658357,39.1633046 93.5017794,39.57064 93.5017794,40.0110092 Z" id="o" transform="translate(96.000000, 40.000000) rotate(-40.539152) translate(-96.000000, -40.000000) " />
                    <path d="M117,32 L113.53012,32 L113.53012,25.3831776 C113.53012,24.6056036 113.392772,24.0411233 113.118072,23.6897196 C112.843372,23.338316 112.489159,23.1626168 112.055422,23.1626168 C111.824095,23.1626168 111.589158,23.2149527 111.350602,23.3196262 C111.112047,23.4242996 110.891567,23.5700925 110.689157,23.7570093 C110.486746,23.9439262 110.30241,24.1644847 110.136145,24.4186916 C109.969879,24.6728985 109.836145,24.9495312 109.73494,25.2485981 L109.73494,32 L106.26506,32 L106.26506,25.3831776 C106.26506,24.6056036 106.127712,24.0411233 105.853012,23.6897196 C105.578312,23.338316 105.224099,23.1626168 104.790361,23.1626168 C104.327709,23.1626168 103.875906,23.3532691 103.43494,23.7345794 C102.993974,24.1158898 102.67229,24.6205576 102.46988,25.2485981 L102.46988,32 L99,32 L99,20.2242991 L102.122892,20.2242991 L102.122892,22.1981308 C102.542171,21.4803702 103.109635,20.9345813 103.825301,20.5607477 C104.540967,20.186914 105.375899,20 106.33012,20 C106.807231,20 107.22289,20.0598125 107.577108,20.1794393 C107.931327,20.299066 108.238553,20.4635504 108.498795,20.6728972 C108.759037,20.882244 108.968674,21.1252323 109.127711,21.4018692 C109.286748,21.6785061 109.402409,21.9738302 109.474699,22.2878505 C109.908436,21.5551365 110.479515,20.9906562 111.187952,20.5943925 C111.896389,20.1981289 112.70602,20 113.616867,20 C114.339763,20 114.921685,20.1383164 115.362651,20.4149533 C115.803617,20.6915902 116.146987,21.0504651 116.392771,21.4915888 C116.638555,21.9327125 116.801204,22.4149507 116.880723,22.9383178 C116.960241,23.4616849 117,23.970091 117,24.4635514 L117,32 Z" id="m" transform="translate(108.000000, 26.000000) rotate(-59.450000) translate(-108.000000, -26.000000) " />
                    <path d="M115.021352,16 C114.081846,16 113.238438,15.8422034 112.491103,15.5266055 C111.743769,15.2110076 111.110323,14.7816541 110.590747,14.2385321 C110.071172,13.6954101 109.676158,13.0678935 109.405694,12.3559633 C109.13523,11.6440331 109,10.8990865 109,10.1211009 C109,9.28439949 109.13523,8.49541655 109.405694,7.75412844 C109.676158,7.01284033 110.067613,6.36330554 110.580071,5.80550459 C111.092529,5.24770363 111.722416,4.80734106 112.469751,4.48440367 C113.217086,4.16146628 114.067611,4 115.021352,4 C115.975094,4 116.82206,4.16146628 117.562278,4.48440367 C118.302495,4.80734106 118.928823,5.24403394 119.441281,5.79449541 C119.953739,6.34495688 120.341636,6.97981292 120.604982,7.69908257 C120.868329,8.41835222 121,9.17430796 121,9.96697248 C121,10.1724781 120.992883,10.3743109 120.978648,10.5724771 C120.964413,10.7706432 120.943061,10.9431185 120.914591,11.0899083 L112.629893,11.0899083 C112.686833,11.8678938 112.960852,12.4587136 113.451957,12.8623853 C113.943063,13.2660571 114.501776,13.4678899 115.128114,13.4678899 C115.626337,13.4678899 116.106759,13.3431205 116.569395,13.093578 C117.032031,12.8440354 117.341636,12.5064241 117.498221,12.0807339 L120.402135,12.9174312 C119.960852,13.8275275 119.277585,14.5688045 118.352313,15.1412844 C117.427042,15.7137643 116.316732,16 115.021352,16 Z M117.391459,8.91009174 C117.320284,8.17614312 117.064059,7.5963324 116.622776,7.1706422 C116.181492,6.744952 115.633455,6.53211009 114.978648,6.53211009 C114.309605,6.53211009 113.758009,6.74862169 113.323843,7.18165138 C112.889678,7.61468106 112.637011,8.19082209 112.565836,8.91009174 L117.391459,8.91009174 Z" id="e" transform="translate(115.000000, 10.000000) rotate(-78.465379) translate(-115.000000, -10.000000) " />
                </g>
            </g>
        </g>
    </svg>
)

export default SVGTemplate