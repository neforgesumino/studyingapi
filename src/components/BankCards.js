import React, { useEffect, useState, useCallback } from 'react';
import {getBankDataColumns, getBankDataValues} from '../services/bankAPI';
import { bankNames, isEmpty } from "../services/bankAPI";

function isAllBanksReady(columns, values, bankKeys) {
   return bankKeys.every(bankName => {
      return columns[bankName]?.length && values[bankName]?.length;
   });
}

function BankCards() {
   const bankKeys = Object.keys(bankNames);
   const [bankDataColumns, setBankDataColumns] = useState({});
   const [bankDataValues, setBankDataValues] = useState({});
   const [renderData, setRenderData] = useState({});

   useEffect(useCallback(() => {
      Promise.all(bankKeys.map((bankName) => (
         Promise.all([getBankDataColumns(bankName), getBankDataValues(bankName)])
      ))).then(data => {
         const values = {};
         const columns = {};

         data.forEach((d, i) => {
            columns[bankKeys[i]] = d[0];
            values[bankKeys[i]] = d[1];
         });

         setBankDataValues(values);
         setBankDataColumns(columns);
      });
   }, [bankKeys]), [bankDataValues, bankDataColumns]);


   if (isAllBanksReady(bankDataColumns, bankDataValues, bankKeys)) {
      bankKeys.forEach((bankName) => {
         setRenderData({
            ...renderData,
            [bankName]: bankDataColumns[bankName]?.map((key, index) => ({
               key, value: bankDataValues[bankName][0][index]
            }))
         });
      });
   }


   if (!isEmpty(renderData)) {
      return (
         <section>
            { bankKeys.map(bankName => (
                  <table>
                     { renderData[bankName]?.map(data => (
                        <tr>
                           <td>{ data.key }</td>
                           <td>{ data.value }</td>
                        </tr>
                     )) }
                  </table>
               )
            ) }
         </section>
      )
   }

   return (
      <div className="main">
         <h1></h1>
         <div className="cardscontainer">
            <article className="card">
               <p> adasd </p>
            </article>
         </div>
      </div>
   )
}

export default BankCards
