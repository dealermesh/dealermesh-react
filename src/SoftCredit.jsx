import { useState } from "react";
import { DMField, DMSoftCreditForm, DM_EVENT_SOFT_CREDIT_RESULTS, DM_FIELDS, useDMEventListener } from "@dealermesh/react";
import Layout from "./Layout";

export default function SoftCredit(props) {
  
  const [softCredit,setSoftCredit] = useState()
  
  useDMEventListener(DM_EVENT_SOFT_CREDIT_RESULTS, event => {
    setSoftCredit(event.detail)
  })

  return <Layout>
    <div className="sections">
      { softCredit &&
      <section>
        <div className="form-panel">
          <h2>Tier { softCredit.tier }</h2>
          <h4>{ softCredit.low } - { softCredit.high }</h4>
        </div>
      </section>
      }
      <section>
        <div className="form-panel">
          <div className="sections">
            <section>
              <h2>Soft Credit Check</h2>
            </section>
            <section>
              <DMSoftCreditForm className="form">
                <div>
                  <label>First Name*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_FIRST_NAME}></DMField>
                </div>
                <div>
                  <label>Last Name*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_LAST_NAME}></DMField>
                </div>
                <div>
                  <label>Email*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_EMAIL}></DMField>
                </div>
                <div>
                  <label>Home Phone*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_PHONE}></DMField>
                </div>
                <div>
                  <label>Address*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_ADDRESS}></DMField>
                </div>
                <div>
                  <label>City*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_CITY}></DMField>
                </div>
                <div>
                  <label>State*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_STATE}></DMField>
                </div>
                <div>
                  <label>Zip Code*</label>
                  <DMField name={DM_FIELDS.SOFT_CREDIT_ZIP}></DMField>
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </DMSoftCreditForm>
            </section>
          </div>
        </div>
      </section>
    </div>
 </Layout>
  
}