'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faCircleCheck,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export default function WorkOrderList() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div>
      <div className='bg-blue-100 text-xs m-1 p-1 rounded-lg'>
        <div className='bg-white grid grid-cols-6 gap-3 p-2 m-1 rounded-md  shadow-lg'>
          <div className='col-span-1'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Time</span>
              <span className='font-semibold'>9:30 am</span>
            </div>
          </div>
          <div className='col-span-3'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Service</span>
              <span className='font-semibold'>
                Hot Water Heater Replacement
              </span>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Job #</span>
              <span className='font-semibold'>1124</span>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex flex-col'>
              <span
                className='text-blue-800 font-medium text-right pr-2'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </span>
            </div>
          </div>
          <div className='col-span-4'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Client Name</span>
              <span className='font-semibold'>Danny Thompson</span>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Missing Parts?</span>
              <span className='font-semibold'>Yes</span>
            </div>
          </div>
          <div className='col-span-4'>
            <div className='flex flex-col'>
              <span className='text-blue-800 font-medium'>Client Address</span>
              <span className='font-semibold'>
                1234 Whispy Oaks Ln, Dallas, TX 75001
              </span>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex items-center'>
              <div className='flex flex-col'>
                <span className='text-blue-800 font-medium'>Status</span>
                <span className='font-semibold'>Pending</span>
              </div>
              <span className='text-blue-800 font-medium pl-2'>
                <FontAwesomeIcon icon={faClock} />
              </span>
            </div>
          </div>
          {isExpanded && (
            <>
              <div className='col-span-2 lg:col-span-1'>
                <div className='flex flex-col'>
                  <span className='text-blue-800 font-medium'>
                    Client Primary Phone
                  </span>
                  <span className='font-semibold'>123-456-7890</span>
                </div>
              </div>
              <div className='col-span-4 lg:col-span-1'>
                <div className='flex flex-col'>
                  <span className='text-blue-800 font-medium'>
                    Client Secondary Phone
                  </span>
                  <span className='font-semibold'>980-765-4321</span>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='flex flex-col'>
                  <span className='text-blue-800 font-medium'>
                    Client Email
                  </span>
                  <span className='font-semibold'>dthompsondev@dsd.org</span>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='flex justify-center'>
                  <table className='w-full md:w-2/3 lg:w-1/2 bg-blue-50 text-left rounded-md'>
                    <thead>
                      <tr className='text-blue-800 text-xs'>
                        <th
                          scope='column'
                          className='text-left font-medium px-2'
                        >
                          Part Name
                        </th>
                        <th scope='column' className='font-medium px-2'>
                          Qty<span className='block'>Need</span>
                        </th>
                        <th scope='column' className='font-medium px-2'>
                          Qty<span className='block'>Stock</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-t-2 border-white'>
                        <th scope='row' className='font-normal px-2'>
                          Water Heater Unit
                        </th>
                        <td className='font-normal px-2'>1</td>
                        <td className='font-normal px-2'>1</td>
                      </tr>
                      <tr className='border-t-2 border-white'>
                        <th scope='row' className='font-normal px-2'>
                          Flexible Water Supply Line, 3/4&quot;x10&quot; (Each)
                        </th>
                        <td className='font-normal px-2'>2</td>
                        <td className='font-normal px-2'>2</td>
                      </tr>
                      <tr className='border-t-2 border-white'>
                        <th scope='row' className='font-normal px-2'>
                          Dielectric Union, 3/4&quot; (Each)
                        </th>
                        <td className='font-normal px-2'>2</td>
                        <td className='font-normal px-2'>2</td>
                      </tr>
                      <tr className='border-t-2 border-white'>
                        <th scope='row' className='font-normal px-2'>
                          Pressure Relief Valve, 3/4&quot; (Each)
                        </th>
                        <td className='font-normal px-2'>1</td>
                        <td className='font-normal px-2'>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-span-6 mt-2'>
                <div className='flex justify-center'>
                  <div className='w-full md:w-2/3 lg:w-1/2 bg-blue-50 p-1 rounded-md'>
                    <span className='text-blue-800 text-xs font-medium'>
                      Appointment notes:
                    </span>
                    <p className='pt-1'>
                      We will need clear access to your utility area. Please
                      move any items as needed and secure pets prior to our
                      visit as we will be entering and exiting your home.
                      Thanks!
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-6 mt-2 pb-2'>
                <div className='flex justify-center'>
                  <button className='bg-blue-700 text-white flex gap-2 items-center w-36 px-2 py-1 text-sm rounded-lg font-semibold shadow-lg cursor-pointer hover:scale-105 transition hover:bg-blue-800'>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className='text-2xl'
                    />
                    Mark Order Complete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
