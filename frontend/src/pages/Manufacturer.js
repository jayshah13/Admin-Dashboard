import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { ManufacturerData,
   ManufacturerGrid } from '../data/dummy';
import { Header } from '../components';

const Manufacturer = () => {
  const toolbarOptions = ['Search'];
  // const [Manufacturer, setManufacturer] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/Manufacturer")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setManufacturer(data);
  //     });
  // }, []);


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Manufacturer" />
      <GridComponent
        dataSource={ManufacturerData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        // editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ManufacturerGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Manufacturer;

