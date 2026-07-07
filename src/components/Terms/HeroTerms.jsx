import Link from 'next/link'
import React from 'react'

const HeroTerms = () => {
  return (
    <div className='p-5'>
      <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
        Terms & Conditions
      </h2>

      {/* Paragraph Blocks */}
      <div className="space-y-4 p-5 border-b-2">
        <p>
          This Promo is valid from <strong>7 May 2026, 12:00 a.m.</strong>, to{' '}
          <strong>6 Jun 2026, 11:59 p.m.</strong> While stocks last. The products under
          this Promo may vary by retail outlet / platform. Not stackable with other
          promotions. Samsung reserves the right to amend these Terms and Conditions and/or
          amend or withdraw this Promo at any time without prior notice and without assigning
          any reasons.
        </p>

        <p>
          "This Promo is valid from 7 May 2026, 12:00 a.m., to 6 Jun 2026, 11:59 p.m. While stocks
          last. The products under this Promo may vary by retail outlet / platform. Enjoy{' '}
          <span className="font-semibold text-gray-900">15% off</span> each new Galaxy Buds4
          Series product with purchase of any Galaxy Smartphone or Tab in a single transaction.
          Not stackable with other promotions. Samsung reserves the right to amend these Terms and
          Conditions and/or amend or withdraw this Promo at any time without prior notice and
          without assigning any reasons.
        </p>

        <p className="text-gray-600 italic">
          *Promotion is valid on selected products (while stocks last) till 6 Jun 2026, 11:59 p.m.
        </p>

        {/* Structured List Formatting */}
        <p>
          In respect of the foregoing: <strong>(a)</strong> redemption of $50 off the next Galaxy Z
          Series via Samsung Online Store, Samsung Shop App or at Samsung Experience Stores only.
          While stocks last; and <strong>(b)</strong> redemption of $20 off any other Samsung
          product only valid for online purchases made through the Samsung Online Store or Samsung
          Shop App.
        </p>

        {/* Sub-sections with bold prefixes */}
        <p>
          <span className="font-bold text-gray-900">Samsung Trade-in:</span> Trade-in value may
          vary depending on model & device condition. Unless otherwise stated, specified trade-in
          values are valid between 7 May - 6 Jun 2026. Samsung reserves the right to amend the list
          of eligible devices & trade-in values at any time without prior notice.
        </p>

        <p>
          <span className="font-bold text-gray-900">Samsung Care+ Screen Care:</span> Samsung
          Care+ Screen Care coverage may vary by country and model. Free 50% off 2-years Samsung
          Care+ Screen Care is only applicable with purchase of Galaxy Z Fold6 and Galaxy Z Flip6.
          Promotion cannot be exchanged for cash and other items and are not valid with any other
          discounts, vouchers, promotions, unless otherwise stated. T&Cs. For further information,
          please visit{' '}
          <Link
            href="https://samsung.com" 
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            www.samsung.com/sg/offer/samsung-care-plus/
          </Link>
          .
        </p>

        {/* Footnotes / Disclaimers */}
      
          <p>Purchase of different products entitles you to different gifts. While stocks last. T&Cs apply.</p>
          <p>Image simulated for illustrative purpose.</p>
          <p>Actual UX/UI may differ.</p>
   
      </div>
    </div>
  )
}

export default HeroTerms
