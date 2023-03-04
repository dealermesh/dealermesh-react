import { useState } from "react";
import { DMDealForm, DMDRProvider, DMField, DMOffersForm, DMPlansForm, DM_EVENT_DR_DEAL_LOADED, DM_EVENT_DR_OFFERS_LOADED, DM_EVENT_DR_PLANS_LOADED, DM_FIELDS, onDMDealTypeChange, useDMEventListener } from "@dealermesh/react";
import Layout from "./Layout";

export default function ProtectionPlans(props) {
  
  const [quoteId,setQuoteId] = useState()
  const [deal,setDeal] = useState()
  const [dealType,setDealType] = useState()
  const [plans,setPlans] = useState([])
  
  useDMEventListener(DM_EVENT_DR_DEAL_LOADED, event => {
    setDealType(event.detail.deal_type)
    setQuoteId(event.detail.quote_id)
    setDeal(event.detail)
  })
  
  useDMEventListener(DM_EVENT_DR_PLANS_LOADED, event => {
    setPlans(event.detail.plans || [])
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
              <h2>Available Offers/Incentives</h2>
            </section>
            <section>
              <DMPlansForm className="form">
                { plans.map((plan,index) => (
                <div>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr key={index}>
                      <td style={{paddingRight: '16px'}}><DMField name={DM_FIELDS.DR_PLAN} value={plan}></DMField></td>
                      <td style={{paddingRight: '16px'}}><strong>{ plan.name }</strong></td>
                      <td>{ plan.price > 0 ? "$" + plan.price : 'FREE' }</td>
                    </tr>
                    <tr key={index}>
                      <td style={{paddingRight: '16px'}}></td>
                      <td style={{paddingRight: '16px'}}>{ plan.description }</td>
                      <td></td>
                    </tr>
                  </table>
                </div>
                ))}
              </DMPlansForm>
            </section>
          </div>
        </div>
      </section>
      }
    </div>
    }
  </Layout>
  
}