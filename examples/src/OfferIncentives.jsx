import { useState } from "react";
import { DMDealForm, DMDRProvider, DMField, DMOffersForm, DM_EVENT_DR_DEAL_LOADED, DM_EVENT_DR_OFFERS_LOADED, DM_FIELDS, onDMDealTypeChange, useDMEventListener } from "@dealermesh/react";
import Layout from "./Layout";

export default function OfferIncentives(props) {
  
  const [quoteId,setQuoteId] = useState()
  const [deal,setDeal] = useState()
  const [dealType,setDealType] = useState()
  const [offers,setOffers] = useState([])
  
  useDMEventListener(DM_EVENT_DR_DEAL_LOADED, event => {
    setDealType(event.detail.deal_type)
    setQuoteId(event.detail.quote_id)
    setDeal(event.detail)
  })
  
  useDMEventListener(DM_EVENT_DR_OFFERS_LOADED, event => {
    setOffers(event.detail.offers || [])
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
              <DMOffersForm className="form">
                { offers.map((ofr,index) => (
                  <div key={index}>
                  <label>
                    <DMField name={DM_FIELDS.DR_OFFER} value={ofr}></DMField> { ofr.name }
                    { ofr.amount > 0 &&
                    <span> - ${ ofr.amount }</span>
                    }
                  </label>
                  </div>
                ))}
              </DMOffersForm>
            </section>
          </div>
        </div>
      </section>
      }
    </div>
    }
  </Layout>
  
}