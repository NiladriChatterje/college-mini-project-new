import React, { useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import axios from 'axios'
import { Stacked, Pie, Button, SparkLine } from '../components';
import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import BudgetModal from './BudgetModal';

const stackedChartData = [{}];
const Ecommerce = () => {
  const { currentColor, currentMode, userDetails } = useStateContext();
  const [total, setTotal] = useState(() => 0);
  const [recent_four, setRecentFour] = useState(() => [])
  const [showModal, setShowModal] = useState(() => true)
  const [budget, setBudget] = useState(() => 2554)
  const [SparklineAreaData, setSparklineAreaData] = useState(() => []);

  const [ecomPieChartData, setEcomPieChartData] = useState(() => [])

  const [stackedCustomSeries, setStackedCustomerSeries] = useState(() => ({
    dataSource: stackedChartData,
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  })
  )

  async function getAllData() {
    if (!userDetails.email) return
    const { data } = await axios.post('http://localhost:8000/getData.php', JSON.stringify({ userID: userDetails.email }));

    if (!data["event_total"]) {
      toast.error('No Record currently');
      return;
    }
    const arrPie = [];
    for (let i of data["event_total"]) {
      const percentage = parseFloat(i?.sum) / parseFloat(data["total"].sum) * 100
      arrPie.push({ x: i?.event_status, y: i?.sum, text: percentage.toFixed(2) + '%' });

    }
    const stackedChartData = [], SparklineAreaData = [];
    for (let i of data["month_total"]) {
      stackedChartData.push({ x: i?.month, y: i?.sum });
      SparklineAreaData.push({ x: i?.month, yval: i?.sum })
    }

    const recent_four = [];
    for (let i of data["recent"])
      recent_four.push(i)


    setEcomPieChartData([...arrPie]);
    setRecentFour([...recent_four]);
    setSparklineAreaData([...SparklineAreaData]);
    setStackedCustomerSeries({ ...stackedCustomSeries, dataSource: stackedChartData })
    setTotal(data["total"]?.sum);
  }

  React.useEffect(() => {
    getAllData()
  }, []);
  if (userDetails?.email)
    return (
      <div className="mt-24">
        <BudgetModal showModal={showModal} setShowModal={setShowModal} setBudget={setBudget} />
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 ">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Budget</p>
                <p className="text-2xl">Rs.{budget}</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: currentColor }} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Set Budget
              </button>

            </div>
          </div>
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            {/*expenses List*/}
            {recent_four?.map((item, i) => (
              <div key={i} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                <button
                  type="button"
                  style={{ color: earningData[i]?.iconColor, backgroundColor: earningData[i]?.iconBg }}
                  className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                >
                  {earningData[i]?.icon}
                </button>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{item.amount}</span>
                </p>
                <p className={`text-sm text-${earningData[i]?.pcColor}`}>
                  {item.timestamp.split(' ')[0]}
                </p>
                <p className="text-sm text-gray-400  mt-1">{item?.event_status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Monthly Expenses</p>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-red-400 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Expense</span>
                </p>
              </div>
            </div>
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <div className=" border-r-1 border-color m-4 pr-10">
                <div>
                  <p className="text-gray-600 mt-1">Expense</p>
                </div>

                <div className="mt-5">
                  <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
                </div>
                <div className="mt-10">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Download Report"
                    borderRadius="10px"
                  />
                </div>
              </div>
              <div>
                <Stacked stackedCustomSeries={stackedCustomSeries} currentMode={currentMode} width="320px" height="360px" />
              </div>
            </div>
          </div>
          <div>
            <div
              className=" rounded-2xl md:w-400 p-4 m-3"
              style={{ backgroundColor: currentColor }}
            >
              <div className="flex justify-between items-center ">
                <p className="font-semibold text-white text-2xl">Total Expenses</p>

                <div>
                  <p className="text-2xl text-white font-semibold mt-8">Rs.{total}</p>
                  <p className="text-gray-200">Monthly revenue</p>
                </div>
              </div>

              <div className="mt-4">
                <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
              </div>
            </div>

            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
              <div>
                <p className="text-2xl font-semibold ">Rs.{total}</p>
                <p className="text-gray-400">Events</p>
              </div>

              <div className="w-40">
                <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (<Navigate to={'/'} />)
};

export default Ecommerce;



