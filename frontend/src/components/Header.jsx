import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import React from 'react';

const Header = ({ category, title, events, setInitialEventFilter }) => {

  function filterAccordingToEvents(args) {
    setInitialEventFilter(args?.text)
  }

  return (
    <div className="flex justify-between w-full mb-10">
      <section>
        <p className="text-lg text-gray-400">{category}</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </p>
      </section>
      {events && <DropDownListComponent width={300} placeholder='Filter' allowFiltering={true}
        filtering={filterAccordingToEvents} dataSource={events} />}
    </div>
  );
}

export default Header;
