import { useState } from "react";
import { DMField, DMTradeForm, DM_EVENT_TRADE_ESTIMATE, DM_EVENT_TRADE_VEHICLE_UPDATE, DM_FIELDS, DM_TRADE_STEP_MILES, DM_TRADE_STEP_OPTIONS, useDMEventListener } from "@dealermesh/react";
import Layout from "./Layout";

export default function TradeEstimateKbbValues(props) {
  
  const [vehicleIdType,setVehicleIdType] = useState("vin")
  const [searchResult,setSearchResult] = useState()
  const [step,setStep] = useState()
  const [trade,setTrade] = useState()
  
  useDMEventListener(DM_EVENT_TRADE_VEHICLE_UPDATE, event => {
    setSearchResult(event.detail)
    setStep(event.detail.step)
  })

  useDMEventListener(DM_EVENT_TRADE_ESTIMATE, event => {
    setTrade(event.detail)
  })

  return <Layout>
    { trade ?
    <section>
      <div className="form-panel">
        <div className="sections">
          <section>
            <h2>Trade Estimate</h2>
          </section>
          <section>
            <h3>{ trade.vehicle.year } { trade.vehicle.make_name } { trade.vehicle.model_name }</h3>
            <h4>{ trade.vehicle.trim_name }</h4>
          </section>
          <section>
            <h1>${ trade.value }</h1>
            ${ trade.value_low } - ${ trade.value_high }
          </section>
        </div>
      </div>
    </section>
    :
    <div className="form-panel">
      <DMTradeForm className="sections">
        { !trade && !step &&
        <section>
          <DMField name={DM_FIELDS.TRADE_VEHICLE_ID_TYPE} value={vehicleIdType}></DMField>
          <div className="menu">
            <a className={ "item" + (vehicleIdType == 'vin' ? ' selected' : '') } onClick={() => setVehicleIdType('vin')}>VIN</a>
            <a className={ "item" + (vehicleIdType == 'plate' ? ' selected' : '') } onClick={() => setVehicleIdType('plate')}>Plate</a>
            <a className={ "item" + (vehicleIdType == 'ymmt' ? ' selected' : '') } onClick={() => setVehicleIdType('ymmt')}>Make/Model</a>
          </div>
        </section>
        }
        { !trade && !step &&
        <section>
          <div className="form">
            { vehicleIdType == 'plate' &&
            <div>
              <label>Plate Number*</label>
              <DMField name={DM_FIELDS.TRADE_VEHICLE_PLATE}></DMField>
            </div>
            }
            { vehicleIdType == 'plate' &&
            <div>
              <label>State*</label>
              <DMField name={DM_FIELDS.TRADE_VEHICLE_STATE}></DMField>
            </div>
            }
            { vehicleIdType == 'vin' &&
            <div>
              <label>VIN*</label>
              <DMField name={DM_FIELDS.TRADE_VEHICLE_VIN}></DMField>
            </div>
            }
            { !step &&
            <div>
              <button type="submit">Find</button>
            </div>
            }
          </div>
        </section>
        }
        { step && searchResult.vehicle &&
        <section>
          <h3>{ searchResult.vehicle.year } { searchResult.vehicle.make_name } { searchResult.vehicle.model_name }</h3>
          <h4>{ searchResult.vehicle.trim_name }</h4>
        </section>
        }
        { !trade && step == DM_TRADE_STEP_MILES &&
        <section>
          <div className="form">
            <div>
              <label>Mileage*</label>
              <DMField name={DM_FIELDS.TRADE_VEHICLE_MILES}></DMField>
            </div>
            <div>
              <label>Condition*</label>
              <DMField name={DM_FIELDS.TRADE_VEHICLE_CONDITION}></DMField>
            </div>
            <div>
              <button type="submit">Continue</button>
            </div>
          </div>
        </section>
        }
        { !trade && step == DM_TRADE_STEP_OPTIONS &&
        <section>
          <div className="form">
            <div>
              <label>Options*</label>
            </div>
            { searchResult.vehicle.options.map((opt,index) => (
              <div key={index} >
                <label>
                  <DMField name={DM_FIELDS.TRADE_VEHICLE_OPTION} value={opt}></DMField> { opt.name }
                </label>
              </div>
            ))}
            <div>
              <button type="submit">Continue</button>
            </div>
          </div>
        </section>
        }
        
      </DMTradeForm>
    </div>
  }
</Layout>
  
}