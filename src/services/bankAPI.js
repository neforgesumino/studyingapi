import axios from 'axios';

export const baseUrl = "https://iss.moex.com/iss/securities.json?q=";
export const mtssUrl = `${baseUrl}MTSS`;
export const sberUrl = `${baseUrl}SBER`;
export const yndxUrl = `${baseUrl}YNDX`;

export const bankNames = { Sber: 'Sber', Yandex: 'Yandex', MTSS: 'MTSS' };

const bankData = {
    [bankNames.Yandex]: { cardData: yndxUrl, detailsData: 'additionalDataUrl' },
    [bankNames.Sber]: { cardData: sberUrl, detailsData: 'additionalDataUrl' },
    [bankNames.MTSS]: { cardData: mtssUrl, detailsData: 'additionalDataUrl' }
};


export const getBankDataColumns = async (bankName) => {
    return await axios.get(bankData[bankName].cardData).then(({data}) => data.securities.columns);
}

export const getBankDataValues = async (bankName) => {
    return await axios.get(bankData[bankName].cardData).then(({data}) => data.securities.data);
}

export function isEmpty(object) {
    return !Object.keys(object).length;
}
