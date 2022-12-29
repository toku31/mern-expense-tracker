import React from 'react'
import  '../resources/analytics.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Analytics({transactions}) {

  const totalTransactions = transactions.length
  // console.log(totalTransactions);
  // console.log(transactions);
  
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type==='収入')
  // console.log('income total', totalIncomeTransactions.length);
  // const totalIncomeTransactions = transactions.filer((transaction) => {return transaction.type==='income'})
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type==='支出')
  // console.log(totalExpenseTransactions);
  const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length/totalTransactions) * 100
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length/totalTransactions) * 100

  const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnover = transactions.filter(transaction=>transaction.type==='収入').reduce((acc, transaction) =>  acc + transaction.amount, 0);
  const totalExpenseTurnover = transactions.filter(transaction=>transaction.type==='支出').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage = (totalIncomeTurnover/totalTurnover) * 100
  const totalExpenseTurnoverPercentage = (totalExpenseTurnover/totalTurnover) * 100

  const categories = ['給料', '住宅費', '食料', '投資', '娯楽', '交通費', '習い事', '医療費', '税金']
   // console.log('totalIncomeTurnover', totalIncomeTurnover);
  // console.log('totalExpenseTurnover', totalExpenseTurnover);

  return (
    <div className='analytics'>
      <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="transactions-count">
              <h4>入力項目の総数  : {totalTransactions}</h4>
              <hr />
              <h5>収入: {totalIncomeTransactions.length}</h5> 
              <h5>支出: {totalExpenseTransactions.length}</h5>
              <div className="progress-bars d-flex" style={{ width: 250, height: 125  }}>
                <CircularProgressbar
                  className='mx-1'
                  value={totalIncomeTransactionsPercentage} 
                  text={`${totalIncomeTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(0, 255, 0, ${totalIncomeTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
                <CircularProgressbar  
                  value={totalExpenseTransactionsPercentage} 
                  text={`${totalExpenseTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(255, 0, 0, ${totalExpenseTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="transactions-count">
              <h4>入力の総額 : {totalTurnover}</h4>
              <hr />
              <h5>収入: {totalIncomeTurnover}</h5> 
              <h5>支出: {totalExpenseTurnover}</h5>
              <div className="progress-bars d-flex" style={{ width: 250, height: 125  }}>
                <CircularProgressbar
                  className='mx-1'
                  value={totalIncomeTurnoverPercentage} 
                  text={`${totalIncomeTurnoverPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(0, 255, 0, ${totalIncomeTurnoverPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
                <CircularProgressbar  
                  value={totalExpenseTurnoverPercentage} 
                  text={`${totalExpenseTurnoverPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(255, 0, 0, ${totalExpenseTurnoverPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
              </div>
            </div>
          </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>収入</h4>
            {categories.map((category)=> {
              console.log(category)
              const amount = transactions.filter(t => t.type==='収入' && t.category===category).reduce((ac,t)=> ac + t.amount , 0)
              return (
                (amount> 0) && 
                <div className='category-card' key={category}>
                  <h5>{category}</h5>
                  <ProgressBar now={amount / totalIncomeTurnover * 100} label={`${(amount / totalIncomeTurnover * 100).toFixed(0)}%`} />
                </div>
              )
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>支出</h4>
            {categories.map((category)=> {
              const amount = transactions.filter(t => t.type==='支出' && t.category===category).reduce((ac,t)=> ac + t.amount , 0)
              return (
                (amount> 0) && <div className='category-card'>
                <h5>{category}</h5>
              
                <ProgressBar now={amount / totalExpenseTurnover * 100} label={`${(amount / totalExpenseTurnover * 100).toFixed(0)}%`} />
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics