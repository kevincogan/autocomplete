import React, { useState } from 'react';
import {
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CFormSelect,
    CButton,
    CSpinner,
} from '@coreui/react';

import './FlightPredictionForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autocomplete from '../Autocomplete/Autocomplete';

function FlightPredictorForm({ formData, handleInputChange, handleSubmit, prediction, isLoading }) {
    const locationDict = {
        "ABE": 0,
        "ABI": 1,
        "ABQ": 2,
        "ABY": 3,
        "ACK": 4,
        "ACT": 5,
        "ACV": 6,
        "ACY": 7,
        "ADK": 8,
        "ADQ": 9,
        "AEX": 10,
        "AGS": 11,
        "AKN": 12,
        "ALB": 13,
        "ALO": 14,
        "AMA": 15,
        "ANC": 16,
        "ANI": 17,
        "APF": 18,
        "ASE": 19,
        "ATL": 20,
        "ATW": 21,
        "AUS": 22,
        "AVL": 23,
        "AVP": 24,
        "AZO": 25,
        "BDL": 26,
        "BET": 27,
        "BFF": 28,
        "BFI": 29,
        "BFL": 30,
        "BGM": 31,
        "BGR": 32,
        "BHM": 33,
        "BIL": 34,
        "BIS": 35,
        "BJI": 36,
        "BLI": 37,
        "BMI": 38,
        "BNA": 39,
        "BOI": 40,
        "BOS": 41,
        "BPT": 42,
        "BQK": 43,
        "BQN": 44,
        "BRO": 45,
        "BRW": 46,
        "BTM": 47,
        "BTR": 48,
        "BTV": 49,
        "BUF": 50,
        "BUR": 51,
        "BWI": 52,
        "BZN": 53,
        "CAE": 54,
        "CAK": 55,
        "CBM": 56,
        "CCR": 57,
        "CDC": 58,
        "CDV": 59,
        "CEC": 60,
        "CHA": 61,
        "CHO": 62,
        "CHS": 63,
        "CIC": 64,
        "CID": 65,
        "CKB": 66,
        "CLD": 67,
        "CLE": 68,
        "CLL": 69,
        "CLT": 70,
        "CMH": 71,
        "CMI": 72,
        "CMX": 73,
        "COD": 74,
        "COS": 75,
        "CPR": 76,
        "CRP": 77,
        "CRW": 78,
        "CSG": 79,
        "CVG": 80,
        "CWA": 81,
        "CYS": 82,
        "DAB": 83,
        "DAL": 84,
        "DAY": 85,
        "DBQ": 86,
        "DCA": 87,
        "DEN": 88,
        "DET": 89,
        "DFW": 90,
        "DHN": 91,
        "DLG": 92,
        "DLH": 93,
        "DRO": 94,
        "DSM": 95,
        "DTW": 96,
        "DUT": 97,
        "EAU": 98,
        "EFD": 99,
        "EGE": 100,
        "EKO": 101,
        "ELM": 102,
        "ELP": 103,
        "ERI": 104,
        "EUG": 105,
        "EVV": 106,
        "EWN": 107,
        "EWR": 108,
        "EYW": 109,
        "FAI": 110,
        "FAR": 111,
        "FAT": 112,
        "FAY": 113,
        "FCA": 114,
        "FLG": 115,
        "FLL": 116,
        "FLO": 117,
        "FMN": 118,
        "FNT": 119,
        "FOE": 120,
        "FSD": 121,
        "FSM": 122,
        "FWA": 123,
        "GCC": 124,
        "GCN": 125,
        "GEG": 126,
        "GFK": 127,
        "GGG": 128,
        "GJT": 129,
        "GLH": 130,
        "GNV": 131,
        "GPT": 132,
        "GRB": 133,
        "GRK": 134,
        "GRR": 135,
        "GSO": 136,
        "GSP": 137,
        "GST": 138,
        "GTF": 139,
        "GTR": 140,
        "GUC": 141,
        "GUM": 142,
        "HDN": 143,
        "HHH": 144,
        "HKY": 145,
        "HLN": 146,
        "HNL": 147,
        "HOU": 148,
        "HPN": 149,
        "HRL": 150,
        "HSV": 151,
        "HTS": 152,
        "HVN": 153,
        "IAD": 154,
        "IAH": 155,
        "ICT": 156,
        "IDA": 157,
        "ILE": 158,
        "ILG": 159,
        "ILM": 160,
        "IND": 161,
        "INL": 162,
        "IPL": 163,
        "ISO": 164,
        "ISP": 165,
        "ITH": 166,
        "ITO": 167,
        "IYK": 168,
        "JAC": 169,
        "JAN": 170,
        "JAX": 171,
        "JFK": 172,
        "JNU": 173,
        "KOA": 174,
        "KSM": 175,
        "KTN": 176,
        "LAN": 177,
        "LAR": 178,
        "LAS": 179,
        "LAW": 180,
        "LAX": 181,
        "LBB": 182,
        "LBF": 183,
        "LCH": 184,
        "LEX": 185,
        "LFT": 186,
        "LGA": 187,
        "LGB": 188,
        "LIH": 189,
        "LIT": 190,
        "LMT": 191,
        "LNK": 192,
        "LNY": 193,
        "LRD": 194,
        "LSE": 195,
        "LWB": 196,
        "LWS": 197,
        "LYH": 198,
        "MAF": 199,
        "MAZ": 200,
        "MBS": 201,
        "MCI": 202,
        "MCN": 203,
        "MCO": 204,
        "MDT": 205,
        "MDW": 206,
        "MEI": 207,
        "MEM": 208,
        "MFE": 209,
        "MFR": 210,
        "MGM": 211,
        "MHT": 212,
        "MIA": 213,
        "MIB": 214,
        "MKC": 215,
        "MKE": 216,
        "MKG": 217,
        "MKK": 218,
        "MLB": 219,
        "MLI": 220,
        "MLU": 221,
        "MOB": 222,
        "MOD": 223,
        "MOT": 224,
        "MQT": 225,
        "MRY": 226,
        "MSN": 227,
        "MSO": 228,
        "MSP": 229,
        "MSY": 230,
        "MTH": 231,
        "MTJ": 232,
        "MYR": 233,
        "OAJ": 234,
        "OAK": 235,
        "OGD": 236,
        "OGG": 237,
        "OKC": 238,
        "OMA": 239,
        "OME": 240,
        "ONT": 241,
        "ORD": 242,
        "ORF": 243,
        "ORH": 244,
        "OTH": 245,
        "OTZ": 246,
        "OXR": 247,
        "PBI": 248,
        "PDX": 249,
        "PHF": 250,
        "PHL": 251,
        "PHX": 252,
        "PIA": 253,
        "PIE": 254,
        "PIH": 255,
        "PIR": 256,
        "PIT": 257,
        "PLN": 258,
        "PMD": 259,
        "PNS": 260,
        "PSC": 261,
        "PSE": 262,
        "PSG": 263,
        "PSP": 264,
        "PUB": 265,
        "PVD": 266,
        "PVU": 267,
        "PWM": 268,
        "RAP": 269,
        "RCA": 270,
        "RDD": 271,
        "RDM": 272,
        "RDR": 273,
        "RDU": 274,
        "RFD": 275,
        "RHI": 276,
        "RIC": 277,
        "RKS": 278,
        "RNO": 279,
        "ROA": 280,
        "ROC": 281,
        "ROP": 282,
        "ROR": 283,
        "ROW": 284,
        "RST": 285,
        "RSW": 286,
        "SAN": 287,
        "SAT": 288,
        "SAV": 289,
        "SBA": 290,
        "SBN": 291,
        "SBP": 292,
        "SCC": 293,
        "SCE": 294,
        "SCK": 295,
        "SDF": 296,
        "SEA": 297,
        "SFO": 298,
        "SGF": 299,
        "SGU": 300,
        "SHV": 301,
        "SIT": 302,
        "SJC": 303,
        "SJT": 304,
        "SJU": 305,
        "SKA": 306,
        "SLC": 307,
        "SLE": 308,
        "SMF": 309,
        "SMX": 310,
        "SNA": 311,
        "SOP": 312,
        "SPI": 313,
        "SPN": 314,
        "SPS": 315,
        "SRQ": 316,
        "STL": 317,
        "STT": 318,
        "STX": 319,
        "SUN": 320,
        "SUX": 321,
        "SWF": 322,
        "SYR": 323,
        "TEX": 324,
        "TLH": 325,
        "TOL": 326,
        "TPA": 327,
        "TRI": 328,
        "TTN": 329,
        "TUL": 330,
        "TUP": 331,
        "TUS": 332,
        "TVC": 333,
        "TVL": 334,
        "TWF": 335,
        "TXK": 336,
        "TYR": 337,
        "TYS": 338,
        "VCT": 339,
        "VIS": 340,
        "VLD": 341,
        "VPS": 342,
        "WRG": 343,
        "WYS": 344,
        "XNA": 345,
        "YAK": 346,
        "YAP": 347,
        "YKM": 348,
        "YUM": 349
    }


    const [originSearchTerm, setOriginSearchTerm] = useState('');
    const [destinationSearchTerm, setDestinationSearchTerm] = useState('');
    const [filteredOriginLocations, setFilteredOriginLocations] = useState([]);
    const [filteredDestinationLocations, setFilteredDestinationLocations] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [originWeatherCondition, setOriginWeatherCondition] = useState('clear');
    const [destinationWeatherCondition, setDestinationWeatherCondition] = useState('clear');

    const handleDateChange = (date) => {
        setStartDate(date);
        const formattedDate = {
            dayOfWeek: date.getDay(),
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        handleInputChange({ target: { name: 'date', value: formattedDate } });
    };

    const handleOriginSearchChange = (e) => {
        setOriginSearchTerm(e.target.value);
        setFilteredOriginLocations(e.target.value ?
            Object.keys(locationDict).filter(location =>
                location.toLowerCase().includes(e.target.value.toLowerCase())
            ) : []
        );
    };

    const handleDestinationSearchChange = (e) => {
        setDestinationSearchTerm(e.target.value);
        setFilteredDestinationLocations(e.target.value ?
            Object.keys(locationDict).filter(location =>
                location.toLowerCase().includes(e.target.value.toLowerCase())
            ) : []
        );
    };

    const handleOriginWeatherChange = (e) => {
        setOriginWeatherCondition(e.target.value);
        handleInputChange({ target: { name: 'originWeatherCondition', value: parseInt(e.target.value) } });
    };

    const handleDestinationWeatherChange = (e) => {
        setDestinationWeatherCondition(e.target.value);
        handleInputChange({ target: { name: 'destinationWeatherCondition', value: parseInt(e.target.value) } });
    };
    console.log(destinationWeatherCondition)

    return (
        <div className="content">
            <h1 className="title">Flight Predictor</h1>
            <p className="description">Enter details to predict flight take-off conditions.</p>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="prediction-form">
                    <CInputGroup className="mb-4 input-group-custom">
                        <CInputGroupText className="input-group-text-custom">Origin Location</CInputGroupText>
                        <CFormInput
                            className='input-box-react inputBoxReact'
                            type="text"
                            placeholder="Enter origin location"
                            id="originLocation"
                            name="originLocation"
                            value={originSearchTerm}
                            onChange={handleOriginSearchChange}
                            autoComplete="off"
                        />
                        <div className="search-results-container">
                            {filteredOriginLocations.map((location, index) => (
                                <div
                                    key={index}
                                    className="search-result-item"
                                    onClick={() => {
                                        setOriginSearchTerm(location);
                                        setFilteredOriginLocations([]);
                                        handleInputChange({ target: { name: 'originLocation', value: locationDict[location] } });
                                    }}
                                >
                                    {location}
                                </div>
                            ))}
                        </div>
                    </CInputGroup>

                    <CInputGroup className="mb-4 input-group-custom">
                        <CInputGroupText className="input-group-text-custom">Origin Weather</CInputGroupText>
                        <CFormSelect
                            className='input-box-react inputBoxReact'
                            id="originWeatherCondition"
                            name="originWeatherCondition"
                            value={originWeatherCondition}
                            onChange={handleOriginWeatherChange}
                        >
                            <option value="0">Clear sky</option>
                            <option value="1">Mainly clear</option>
                            <option value="2">Partly cloudy</option>
                            <option value="3">Overcast</option>
                            <option value="45">Fog</option>


                            <option value="48">Depositing rime fog</option>
                            <option value="51">Light drizzle</option>
                            <option value="53">Moderate drizzle</option>
                            <option value="55">Dense drizzle</option>
                            <option value="56">Light freezing drizzle</option>
                            <option value="57">Dense freezing drizzle</option>
                            <option value="61">Slight rain</option>
                            <option value="63">Moderate rain</option>
                            <option value="65">Heavy rain</option>
                            <option value="66">Light freezing rain</option>
                            <option value="67">Heavy freezing rain</option>
                            <option value="71">Slight snow fall</option>
                            <option value="73">Moderate snow fall</option>
                            <option value="75">Heavy snow fall</option>
                            <option value="77">Snow grains</option>
                            <option value="80">Slight rain showers</option>
                            <option value="81">Moderate rain showers</option>
                            <option value="82">Violent rain showers</option>
                            <option value="85">Slight snow showers</option>
                            <option value="86">Heavy snow showers</option>
                            <option value="95">Slight or moderate thunderstorm</option>
                            <option value="96">Thunderstorm with slight hail</option>
                            <option value="99">Thunderstorm with heavy hail</option>

                        </CFormSelect>
                    </CInputGroup>

                    <CInputGroup className="mb-4 input-group-custom">
                        <CInputGroupText className="input-group-text-custom">Destination Location</CInputGroupText>
                        <CFormInput
                            className='input-box-react inputBoxReact'
                            type="text"
                            placeholder="Enter destination location"
                            id="destinationLocation"
                            name="destinationLocation"
                            value={destinationSearchTerm}
                            onChange={handleDestinationSearchChange}
                            autoComplete="off"
                        />
                        <div className="search-results-container">
                            {filteredDestinationLocations.map((location, index) => (
                                <div
                                    key={index}
                                    className="search-result-item"
                                    onClick={() => {
                                        setDestinationSearchTerm(location);
                                        setFilteredDestinationLocations([]);
                                        handleInputChange({ target: { name: 'destinationLocation', value: locationDict[location] } });
                                    }}
                                >
                                    {location}
                                </div>
                            ))}
                        </div>
                    </CInputGroup>



            
                   
                        <Autocomplete className="mb-4 input-group-custom" label="Music Request" />


   

                    <CInputGroup className="mb-4 input-group-custom">
                        <CInputGroupText className="input-group-text-custom">Destination Weather</CInputGroupText>
                        <CFormSelect
                            className='input-box-react inputBoxReact'
                            id="destinationWeatherCondition"
                            name="destinationWeatherCondition"
                            value={destinationWeatherCondition}
                            onChange={handleDestinationWeatherChange}
                        >
                            <option value="0">Clear sky</option>
                            <option value="1">Mainly clear</option>
                            <option value="2">Partly cloudy</option>
                            <option value="3">Overcast</option>
                            <option value="45">Fog</option>


                            <option value="48">Depositing rime fog</option>
                            <option value="51">Light drizzle</option>
                            <option value="53">Moderate drizzle</option>
                            <option value="55">Dense drizzle</option>
                            <option value="56">Light freezing drizzle</option>
                            <option value="57">Dense freezing drizzle</option>
                            <option value="61">Slight rain</option>
                            <option value="63">Moderate rain</option>
                            <option value="65">Heavy rain</option>
                            <option value="66">Light freezing rain</option>
                            <option value="67">Heavy freezing rain</option>
                            <option value="71">Slight snow fall</option>
                            <option value="73">Moderate snow fall</option>
                            <option value="75">Heavy snow fall</option>
                            <option value="77">Snow grains</option>
                            <option value="80">Slight rain showers</option>
                            <option value="81">Moderate rain showers</option>
                            <option value="82">Violent rain showers</option>
                            <option value="85">Slight snow showers</option>
                            <option value="86">Heavy snow showers</option>
                            <option value="95">Slight or moderate thunderstorm</option>
                            <option value="96">Thunderstorm with slight hail</option>
                            <option value="99">Thunderstorm with heavy hail</option>
                        </CFormSelect>
                    </CInputGroup>

                    <CInputGroup className="mb-4 input-group-custom">
                        <CInputGroupText className="input-group-text-custom">Date</CInputGroupText>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            className='input-box-react inputBoxReact date-picker'
                            wrapperClassName="date-picker-wrapper"
                        />
                    </CInputGroup>

                    <CButton type="submit" className="submit-button" color="primary" variant="outline">
                        {isLoading ? (
                            <>
                                {/* Loading... */}
                                <CSpinner className="spinner-on-button" />
                            </>
                        ) : (
                            'Predict'
                        )}
                    </CButton>

                </form>

                {prediction && (
                    <div className={`prediction-result ${prediction.status}`}>
                        <p>The flight is predicted to be: <strong>{prediction.status}</strong></p>
                        <p>Confidence: <strong>{prediction.confidence}%</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FlightPredictorForm;
