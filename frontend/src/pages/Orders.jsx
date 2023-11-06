import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { contextMenuItems } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';


function gridOrderImage(props, setInitialEventFilter) {
  const { userDetails } = useStateContext();

  async function deleteRecord() {
    console.log(props)
    const { data } = await axios.post('http://localhost:8000/deleteRecord.php', JSON.stringify({
      userID: userDetails?.email,
      timestamp: props?.date
    }));
    console.log(data)
    location.reload();
  }

  return (
    <div style={{ cursor: 'pointer' }} onClick={deleteRecord}>
      Delete
    </div>
  );
}

const ordersGrid = [
  {
    field: 'date',
    headerText: 'Date',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'spentOn',
    headerText: 'spent on',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'description',
    headerText: 'Description',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'TotalAmount',
    headerText: 'Amount',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center',
  },
  {
    template: gridOrderImage,
    headerText: 'Delete',
    width: '150',
    textAlign: 'Center',
  },
];


const Orders = () => {
  const { userDetails } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };
  const [initialEventFilter, setInitialEventFilter] = React.useState('All');
  const [events, setEvents] = React.useState(() => []);
  const [ordersData, setOrderData] = React.useState(() => [])

  async function allRecords(initialEventFilter) {
    if (!userDetails.email) return;
    try {
      const { data } = await axios.post('http://localhost:8000/AllRecords.php', JSON.stringify({
        userID: userDetails?.email,
        filter: initialEventFilter
      }));
      if (data) {
        const tempArray = [], eventArray = [];
        for (let i in data) {
          if (!events.includes(data[i]?.event_status))
            eventArray.push(data[i].event_status)
          tempArray.push({ ...ordersData[i], date: data[i]?.timestamp, TotalAmount: data[i]?.amount, Location: data[i]?.location, spentOn: data[i]?.event_status, description: data[i]?.purpose })
        } setOrderData(tempArray);
        setEvents([...eventArray])
      }
    } catch (e) { }
  }
  React.useEffect(() => {
    allRecords(initialEventFilter);
  }, [initialEventFilter]);

  if (userDetails.email)
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" events={events} setInitialEventFilter={setInitialEventFilter} />
        <GridComponent
          rowSelected={e => { gridOrderImage(e.data, setInitialEventFilter) }}
          id="gridcomp"
          dataSource={ordersData}
          style={{ cursor: 'pointer' }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>
      </div>
    );
  return <Navigate to='/' />
};
export default Orders;
