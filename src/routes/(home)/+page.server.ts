import 'dotenv-expand/config'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({parent, fetch, cookies}) => {
    const parentData = await parent();
    const getTodayDate = async() => {
        let now = new Date(), month, day, year;
        let dateString;

        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        dateString = [year, month, day].join('-');
        return dateString;
    }

    const getTransactionSummaries = async() => {
      const todayDate = await getTodayDate();
      const endpoint = `${process.env.HOST_URL}/users/${process.env.USER_ID}/transactions/summary/${todayDate}`;
      const transactionRes = await fetch(endpoint);
      const transactionData = await transactionRes.json();

      return transactionData;
    }

    return {
        summaries: getTransactionSummaries()
    }
}