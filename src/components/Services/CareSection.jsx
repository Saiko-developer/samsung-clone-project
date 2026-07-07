"use client";

const CareSection = () => {
  return (
    <main>
      <section className="relative h-[80vh] bg-black/50 overflow-hidden">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/offer/trustbank-promotion/1440x640.jpg?$1440_N_JPG$"
          alt="Samsung Appliances"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <span className=" text-sm font-semibold uppercase tracking-widest mb-3">
            Samsung Home Appliances
          </span>
          <h1 className="text-4xl md:text-6xl font-bold  mb-4 leading-tight">
            Intelligence That
            <br />
            Cares for Your Home.
          </h1>
          <p className="text-gray-30 text-lg mb-8 max-w-xl">
            From AI-powered washers to bespoke refrigerators — discover
            appliances that adapt to your life.
          </p>
          <button className="self-start border-0 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Learn more
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center p-10">
        <div className="w-full p-2 bg-gray-200 text-center text-xl">
          <h1>How it works?</h1>
        </div>
        <div className="grid grid-cols-3 ">
          <div className="text-center border px-2 py-5 ">
            <h1 className="font-bold text-xl">Step1</h1>
            <p>
              Sign up for your first Trust Credit Card through the
              <br />{" "}
              <a href="" className="text-blue-500">
                link
              </a>
            </p>
          </div>
          <div className="text-center border px-2 py-5 ">
            <h1 className="font-bold text-xl">Step1</h1>
            <p>
              Upon successful sign-up, you will receive a Samsung e-voucher code
              in your Trust app. Download the Trust app to access your
              redemption code.
            </p>
          </div>
          <div className="text-center border px-2 py-5 ">
            <h1 className="font-bold text-xl"> Step1</h1>
            <p>
              Enter the promo code before you check-out on{" "}
              <a href="" className="text-blue-500">
                Samsung.com
              </a>
              , Samsung Shop App or Samsung Enhanced Partnership Programme (EPP)
              sites.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col p-10">
        <div className="font-mono text-center pb-5 ">
          <h1 className="text-4xl font-bold">Terms and conditions</h1>
        </div>
        <div className="flex flex-col items-start font-mono text-start">
          <h1 className="text-4xl font-bold">*T&Cs for new Trust Bank users</h1>
          <div className="bg-white py-8 px-6 max-w-7xl mx-auto font-sans antialiased text-gray-900">
            <ol className="list-decimal list-outside pl-5 space-y-2.5 text-xs md:text-sm text-gray-800 leading-normal tracking-normal">
              <li>
                This Promotion will commence on 1 June 2026, 12:00 a.m., and
                will continue until 31 August 2026, 11:59 p.m.
              </li>
              <li>
                This Promotion is only applicable to: (i) new customers of Trust
                Bank only; and (ii) transactions made on the Samsung Online
                Store, including the Samsung Singapore Shop App and Samsung
                Enhanced Partnership Shop, Student Shop, Employee Purchase
                Portal(s)) (each, an "Eligible Platform"), and is subject to
                limited quantities while stocks last.
              </li>
              <li>
                Under this Promotion, each voucher ("Voucher") shall be valid
                for three (3) months, commencing on the first day of the
                calendar month immediately following the date of issuance of
                such Voucher ("Start Date") and expiring on the last day of the
                third calendar month thereafter ("Expiry Date"). For example, a
                Voucher issued on 27 May 2026 will have Start Date of 1 June
                2026 and an Expiry Date of 30 September 2026.
              </li>
              <li>
                To redeem a Voucher, the total check-out order value must exceed
                the face value of the voucher by a minimum of S$1.00. For
                example, a S$80-Voucher will require a minimum check-out order
                value of S$81.00 for the Promotion.
              </li>
              <li>
                Once a Voucher has been applied and redeemed at check-out, the
                transaction will be final and irrevocable. No refund of the
                Voucher value shall be permitted under any circumstance,
                regardless of whether the order is cancelled or returned.
              </li>
              <li>
                In the event of refund / return, products purchased under this
                Promotion will be subject to deduction of the discounted value
                and value of gifts not returned.
              </li>
              <li>
                Samsung reserves the right to reject any order in connection
                with this Promotion, which it determines, in its sole and
                absolute discretion, is not in accordance with these Terms and
                Conditions.
              </li>
              <li>
                Samsung reserves the right to amend or withdraw this Promotion
                and/or these Terms and Conditions without prior notice.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col items-start font-mono text-start">
          <h1 className="text-4xl font-bold">
            **T&Cs for existing Trust Bank Users
          </h1>
          <div className="bg-white py-8 px-6 max-w-7xl mx-auto font-sans antialiased text-gray-900">
            <ol className="list-decimal list-outside pl-5 space-y-2 text-xs md:text-sm text-gray-800 leading-normal tracking-tight">
              <li>
                This Promotion will commence on 1 June 2026, 12:00 a.m., and
                will continue until 31 Aug 2026, 11:59 p.m.
              </li>
              <li>
                Notwithstanding the foregoing, this Promotion is limited to the
                first 200 qualifying transactions made on the Samsung Online
                Store, including Samsung Singapore Shop App, Samsung Enhanced
                Partnership Stores (e.g., Samsung Business Shop, Student Shop,
                Employee Purchase Portal(s)) (each, an "Eligible Platform").
              </li>
              <li>
                Under this Promotion, each customer who spends at least S$1,200
                when purchasing any Samsung Products on an Eligible Platform
                will be entitled to S$80 off when such customer checks out via
                VISA Instalments payment method with eligible Trust Bank Credit
                Cards only. Instalments are available for Trust Credit Cards
                only. Debit Cards and Supplementary Cards will be charged the
                full amount with no instalments. If an instalment plan is
                approved, Trust will send a confirmation. Trust's General Terms
                and Conditions, Trust Visa Instalments Product Terms and Key
                Facts Sheet apply.
              </li>
              <li>
                This Promotion is stackable and can be used in conjunction with
                other offers, promotions and/or discounts available on the
                Samsung Online Store
              </li>
              <li>
                In the event of refund / return, products purchased under this
                Promotion will be subject to deduction of the discounted value
                and value of gifts not returned.
              </li>
              <li>
                Samsung reserves the right to reject any order in connection
                with this Promotion, which it determines, in its sole and
                absolute discretion, is not in accordance with these Terms and
                Conditions.
              </li>
              <li>
                Samsung reserves the right to amend or withdraw this Promotion
                and/or these Terms and Conditions without prior notice.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareSection;
