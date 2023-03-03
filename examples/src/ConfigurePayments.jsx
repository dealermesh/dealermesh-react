import { useState } from "react";
import { DMDealForm, DMDRProvider, DMField, DMSoftCreditForm, DM_EVENT_DR_DEAL_LOADED, DM_EVENT_SOFT_CREDIT_RESULTS, DM_FIELDS, onDMDealTypeChange, useDMEventListener } from "@dealermesh/react";
import Layout from "./Layout";

export default function ConfigurePayments(props) {
  
  const [quoteId,setQuoteId] = useState()
  const [deal,setDeal] = useState()
  const [dealType,setDealType] = useState()
  
  useDMEventListener(DM_EVENT_DR_DEAL_LOADED, event => {
    console.log(event.detail)  
    setDealType(event.detail.deal_type)
    setQuoteId(event.detail.quote_id)
    setDeal(event.detail)
  })
  
  const onDealTypeChange = (type) => {
    setDealType(type)
    onDMDealTypeChange(type)
  }

  return <Layout props={props}>
    <DMDRProvider vin={props.vin} msrp={props.msrp} price={props.price}></DMDRProvider>
    { deal &&
    <div className="sections">
      <section key={quoteId}>
        <div className="form-panel">
          <div className="sections">
            <section>
              <div className="menu">
                <a className={ "item" + (dealType == 'lease' ? ' selected' : '') } onClick={() => onDealTypeChange('lease')}>Lease</a>
                <a className={ "item" + (dealType == 'finance' ? ' selected' : '') } onClick={() => onDealTypeChange('finance')}>Finance</a>
                <a className={ "item" + (dealType == 'cash' ? ' selected' : '') } onClick={() => onDealTypeChange('cash')}>Cash</a>
              </div>
            </section>
            <section>
              { dealType == 'lease' &&
              <h2>${ deal.lease.payment }/mo</h2>
              }
              { dealType == 'finance' &&
              <h2>${ deal.finance.payment }/mo</h2>
              }
              { dealType == 'cash' &&
              <h2>${ deal.cash.payment }</h2>
              }
            </section>
          </div>
        </div>
      </section>
      { dealType != 'cash' &&
      <section>
        <div className="form-panel">
          <div className="sections">
            <section>
              <h2>Configure Payments</h2>
            </section>
            <section>
              <DMDealForm className="">
              { dealType != 'cash' &&
              <div>
                <label>Cash Down*</label>
                <DMField name={DM_FIELDS.DR_CASH_DOWN} value={deal.down}></DMField>
              </div>
              }
              { dealType != 'cash' &&
              <div>
                <label>Estimated Credit Score*</label>
                <DMField name={DM_FIELDS.DR_CREDIT_TIER} value={deal.credit_tier}></DMField>
              </div>
              }
              { dealType == 'lease' &&
              <div>
                <label>Term in Months*</label>
                <DMField name={DM_FIELDS.DR_LEASE_TERM} value={deal.lease.term} label="Months"></DMField>
              </div>
              }
              { dealType == 'finance' &&
              <div>
                <label>Term in Months*</label>
                <DMField name={DM_FIELDS.DR_FINANCE_TERM} value={deal.finance.term} label="Months"></DMField>
              </div>
              }
              { dealType == 'lease' &&
              <div>
                <label>Annual Miles*</label>
                <DMField name={DM_FIELDS.DR_LEASE_MILES} value={deal.lease.mileage} label="Miles"></DMField>
              </div>
              }
              </DMDealForm>
            </section>
          </div>
        </div>
      </section>
      }
    </div>
    }
  </Layout>
  
}