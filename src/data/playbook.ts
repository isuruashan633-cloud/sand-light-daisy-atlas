export type Status = "place" | "implement" | "external" | "confirm";

export type Lane = "plan" | "make" | "ship" | "warehouse" | "customers";

export const lanes: { id: Lane | "all"; label: string; note: string }[] = [
  { id: "all", label: "Whole process", note: "All 14 steps" },
  { id: "plan", label: "I plan products", note: "Forecast and merchandising" },
  { id: "make", label: "I make and pack", note: "Planning, production, finishing" },
  { id: "ship", label: "I handle shipping and money", note: "BOI, CUSDEC, costing, refunds" },
  { id: "warehouse", label: "I run the warehouse", note: "Wattala: receive, pick, pack, dispatch" },
  { id: "customers", label: "I look after customers", note: "Shopify, marketing, complaints" },
];

export type Person = {
  name: string;
  role: string;
  status: Status;
  statusLabel: string;
  body: string;
  note?: string;
  fresh?: boolean;
};

export const people: Person[] = [
  {
    name: "Digital Marketing Executive",
    role: "Marketing · Biyagama · reports to Sasini",
    status: "implement",
    statusLabel: "To implement",
    fresh: true,
    body: "Sits at DSL Lanka, Export Processing Zone, Biyagama. Before 12:30 p.m. checks Shopify orders, emails the day’s list to Wattala, creates one waybill per order, and sends one folder per order. After the 5:00 p.m. handover proof arrives, marks only courier-collected orders as fulfilled. Owns the Shopify storefront, Meta, Google and TikTok campaigns, and the weekly numbers.",
  },
  {
    name: "Warehouse Assistant",
    role: "Operations · Wattala · reports to Sasini",
    status: "implement",
    statusLabel: "To implement",
    fresh: true,
    body: "Receives each quarterly transfer at Wattala, checks SKU, quantity and condition, and reports the real count to the Operations Executive. That count is the opening stock in Shopify. From the 12:30 p.m. list, picks and packs against the matching folder, attaches the waybill, and sends courier handover proof to Biyagama before 5:00 p.m. Counts every SKU once a month.",
  },
  {
    name: "Risina Surandi",
    role: "Data Analyst",
    status: "place",
    statusLabel: "In place",
    body: "Reads Shopify sales, forecasts the next three months, picks the product mix, presents it to Management, and reports stock and KPIs.",
  },
  {
    name: "Isuru Asan",
    role: "Operations Executive",
    status: "place",
    statusLabel: "In place",
    body: "Issues the purchase order only after customs approval and payment are both clear. Asks Shipping to move cleared goods to Wattala, and takes the Warehouse Assistant’s receipt and any unresolved stock variance.",
  },
  {
    name: "Sasini",
    role: "Assistant Marketing Manager",
    status: "place",
    statusLabel: "In place",
    body: "Line manager for the Digital Marketing Executive and the Warehouse Assistant. Runs local marketing, and is the backup for digital and Shopify work.",
  },
  {
    name: "Thamara Kariyawasam",
    role: "Senior Merchandising Executive",
    status: "place",
    statusLabel: "In place",
    body: "Works from the purchase order. Gets product, fabrics, packaging and labels ready, then hands finished goods to packing.",
  },
  {
    name: "Dhanushka Dissanayake",
    role: "Merchandising Executive",
    status: "place",
    statusLabel: "In place",
    note: "Backup for Thamara Kariyawasam",
    body: "Covers merchandising and sourcing when Thamara is not available.",
  },
  {
    name: "Prasad",
    role: "Assistant Manager — Planning",
    status: "place",
    statusLabel: "In place",
    body: "Turns the merchandising requirement into a production plan and a firm readiness date.",
  },
  {
    name: "Krishantha",
    role: "Planning backup",
    status: "place",
    statusLabel: "In place",
    note: "Backup for Prasad",
    body: "Steps in for production planning when Prasad is not available.",
  },
  {
    name: "Pathum Srimal",
    role: "Manager — Finishing & Packing",
    status: "place",
    statusLabel: "In place",
    body: "Finishes and packs the goods, then issues the final packing list.",
  },
  {
    name: "Shehan Rathnayake",
    role: "Finishing & Packing Executive",
    status: "place",
    statusLabel: "In place",
    note: "Backup for Pathum Srimal",
    body: "Backup for finishing and packing.",
  },
  {
    name: "Shanil Costa",
    role: "Shipping Manager",
    status: "place",
    statusLabel: "In place",
    body: "Owns shipping papers, CUSDEC coordination, and local transport from Biyagama to the Wattala warehouse.",
  },
  {
    name: "Ishara Rathnayake",
    role: "Shipping Executive",
    status: "place",
    statusLabel: "In place",
    note: "Backup for Shanil Costa",
    body: "Backup for Shipping.",
  },
  {
    name: "Sachini Madushika",
    role: "Executive Finance",
    status: "place",
    statusLabel: "In place",
    body: "Pays CUSDEC, builds the local selling price, and runs the refund once management has approved it.",
  },
  {
    name: "Malsha Hiruni",
    role: "Costing & Supply Chain Executive",
    status: "place",
    statusLabel: "In place",
    note: "Backup for Sachini Madushika",
    body: "Backup for costing.",
  },
  {
    name: "Ms. Gayara Perera",
    role: "Management",
    status: "place",
    statusLabel: "In place",
    body: "Approves the bigger calls, including refunds with Mr. Dhevin. Also owns the local marketing advertising budget card.",
  },
  {
    name: "Mr. Dhevin",
    role: "Management",
    status: "place",
    statusLabel: "In place",
    body: "Approves refunds together with Ms. Gayara.",
  },
  {
    name: "Third-party courier",
    role: "Delivery partner",
    status: "external",
    statusLabel: "External",
    body: "Collects labelled parcels from Wattala and delivers them to the customer.",
  },
];

export type Step = {
  n: string;
  title: string;
  owner: string;
  starts: string;
  do: string[];
  handover: string;
  watch?: string;
  lanes: Lane[];
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Forecast demand and pick the products",
    owner: "Risina Surandi, Data Analyst",
    starts: "A local-sales range needs planning, or stock needs replenishing. Stock is topped up once every three months.",
    do: [
      "Use Shopify sales from 2023–2026 as the main history for this work.",
      "Build the mix as written: 25% USA best movers, 50% Sri Lanka past best movers, and 25% Sri Lanka 2026 new launch.",
      "Keep the category split at 55% rubber and 45% plush.",
      "Calculate how many units of each product are needed for the next three months, and lock the styles.",
      "Present the list to Management.",
      "Report stock through the Power BI dashboard. A proper inventory system is still needed — Power BI is the current view, not the long-term home.",
    ],
    handover: "Once Management approves, Risina gives the quantity list to the Operations Executive.",
    watch: "There is no separate formal Sales Planning process today. In practice, this work lives in forecasting, product selection and inventory analysis.",
    lanes: ["plan"],
  },
  {
    n: "02",
    title: "Clear customs, then issue the purchase order",
    owner: "Isuru Asan, Operations Executive, with Shipping and Finance",
    starts: "The approved quantity list is in, and the goods were made under BOI concessions for sale in Sri Lanka.",
    do: [
      "List the stock for local sale — SKU, quantity, invoice value and any customer requirements.",
      "Give product details, approved selling prices, quantities and weights for Customs valuation where needed.",
      "Prepare the BOI Local Sale Application, Commercial Invoice, valuation details, shipping papers, and anything else BOI or Sri Lanka Customs asks for.",
      "Submit through the BOI approval channel. Shipping registers the CUSDEC and watches the validity window. If it expires, cancel and start again.",
      "Customs issues an Assessment Notice covering duty, taxes, levies and other statutory charges. Finance pays and keeps the proof.",
      "Only when the approval and the payment are both clear, the Operations Executive sends Merchandising a purchase order. It lists each SKU and its quantity.",
    ],
    handover: "The purchase order goes to the Merchandiser. Assessment and payment records stay with Finance and Shipping.",
    watch: "No purchase order goes out until customs approval and payment are both clear. Goods still must not leave the zone until final clearance is on file — see Step 07 if the packed quantity changes the assessment.",
    lanes: ["ship"],
  },
  {
    n: "03",
    title: "Check raw materials and packaging",
    owner: "Thamara Kariyawasam · backup Dhanushka Dissanayake",
    starts: "The Merchandiser has the purchase order.",
    do: [
      "Check fabrics and raw materials already in stores.",
      "Order or import anything that is missing — do this straight away, not later.",
      "At the same time, order packaging, hang tags and labels for the styles and quantities.",
      "Use the same global Tikiri SKU, barcode and labelling standard we use everywhere else. Local sale does not get a different code system.",
      "Confirm the expected ready dates for materials and packaging.",
      "Give the Production Planner the production order and the date the materials will be ready.",
    ],
    handover: "The production requirement, plus raw-material ready dates, goes to Production Planning.",
    lanes: ["plan"],
  },
  {
    n: "04",
    title: "Build the production plan",
    owner: "Prasad, Assistant Manager — Planning · backup Krishantha",
    starts: "Merchandising confirms materials and packaging are on track and sends the requirement.",
    do: [
      "Check the requirement against real working capacity — not hoped-for capacity.",
      "Issue planned start and finish dates, plus the final production readiness date.",
      "If it is a new or revised product, include the PP sample step before full production.",
      "If the asked delivery date does not fit capacity, flag it before the run starts. Do not discover this mid-line.",
    ],
    handover: "The confirmed delivery date goes back to Merchandising. The schedule is shared with Production.",
    lanes: ["make"],
  },
  {
    n: "05",
    title: "Make the goods, check them, and finish the run",
    owner: "Production team with Merchandising",
    starts: "The plan is approved and the materials are actually ready.",
    do: [
      "For a new product or a design change, make a pre-production (PP) sample first.",
      "Merchandising checks the PP sample against the approved spec. Full production does not start without written PP approval.",
      "Merchandising follows the run at around 25%, 50% and 75% complete — at minimum.",
      "Write down and escalate any quality issue, short quantity, or date slip.",
      "When manufacturing is done, Planning tells Merchandising.",
    ],
    handover: "Merchandising hands finished goods to Finishing & Packing.",
    lanes: ["make"],
  },
  {
    n: "06",
    title: "Finish and pack the stock",
    owner: "Pathum Srimal · backup Shehan Rathnayake",
    starts: "Manufacturing is complete and the goods are handed over for final packing.",
    do: [
      "Pack to the merchandiser’s instructions — not to a guess.",
      "Complete the final packing list with carton details, CBM and gross weight.",
      "Confirm to the Merchandiser that packing is complete.",
      "Send that packing list to Shipping, and copy Merchandising.",
    ],
    handover: "The Merchandiser tells the Operations Executive the toys are packed. Shipping has the packing list for transport and Customs release.",
    lanes: ["make"],
  },
  {
    n: "07",
    title: "Release the goods from the zone",
    owner: "Shanil Costa with Sachini Madushika, on the Operations Executive’s request",
    starts: "Merchandising has said the goods are packed, and Shipping has the final packing list.",
    do: [
      "The Operations Executive asks Shipping to check clearance and arrange local transport to Wattala.",
      "Shipping checks the CUSDEC still matches the final quantity and weight. If the assessment changed, Finance pays the difference and keeps the proof.",
      "If the CUSDEC validity window has expired, cancel and start again. Do not move the goods on an expired entry.",
      "Submit payment evidence as required and get final clearance.",
      "Only after clearance and duty settlement should goods leave the zone.",
    ],
    handover: "Cleared goods are released for transport to the Wattala warehouse.",
    watch: "Regulatory processing can take several working days after payment. Build that wait into the plan, or Wattala will sit empty while papers catch up.",
    lanes: ["ship"],
  },
  {
    n: "08",
    title: "Move stock to Wattala and receive it",
    owner: "Operations Executive directs it. Shipping moves it. Warehouse Assistant receives it.",
    starts: "Goods are cleared for local sale and ready to leave the zone.",
    do: [
      "Shipping picks a suitable local transport using the final CBM and gross weight. The trip is from DSL Biyagama to the Wattala warehouse.",
      "The Colombo 10 store (273 Panchikawatta Road) is no longer the local warehouse. Do not deliver there.",
      "The Warehouse Assistant follows the Operations Executive’s receiving instructions. Check each SKU, quantity and condition against the transfer documents.",
      "Record shortages, excess units or damage separately. Keep damaged units off the saleable shelf.",
      "Report the actual quantities received to the Operations Executive.",
      "Those confirmed quantities become the opening stock in Shopify. The Digital Marketing Executive does not invent a stock figure.",
    ],
    handover: "Accepted stock goes into labelled locations at Wattala and can be sold in a controlled way.",
    watch: "Courier collection is from Wattala. The order desk stays at Biyagama. Do not treat the factory as a second dispatch point.",
    lanes: ["warehouse", "ship"],
  },
  {
    n: "09",
    title: "Store stock and keep the numbers honest",
    owner: "Warehouse Assistant, Wattala. Line manager: Sasini. Variances: Operations Executive.",
    starts: "Stock has been accepted into the Wattala warehouse.",
    do: [
      "Give every SKU a fixed, labelled shelf or rack. Keep fast movers close to packing. Keep damaged units separate.",
      "Pick FIFO — older stock of the same SKU goes first.",
      "Keep a simple SKU-to-location register so anyone on shift can find an item.",
      "Once inventory tracking is on, Shopify deducts sales. Receipts, dispatches and approved damage or loss still need a written reason before a number is changed.",
      "Flag low-stock items to Risina before we stock out.",
      "Once a month, count the physical units of every SKU and compare each count with the Shopify balance for Wattala.",
      "Recount differences, check receipts and dispatch records, and report unresolved variances to the Operations Executive. Keep the count sheet.",
    ],
    handover: "Accurate available stock feeds Finance, Shopify, marketing and the next three-month plan.",
    lanes: ["warehouse"],
  },
  {
    n: "10",
    title: "Build the local cost and the B2C selling price",
    owner: "Sachini Madushika · costing backup Malsha Hiruni",
    starts: "Products and operating costs for local sale need a price.",
    do: [
      "DSL costing uses consumption from CAD and SMV from Industrial Engineering (Amal). Accessory specs come from the sample room where that applies.",
      "Include transport from DSL Biyagama to the Wattala warehouse.",
      "DSL manufacturing cost plus DSL profit margin gives the FOB price. DSL usually gives FOB in USD. Finance converts to LKR at the applicable rate.",
      "For the local B2C price, fold in CUSDEC duty, packaging, VAT, and the website payment-processing charge (noted as 3%).",
      "Watch the Customs codes that show up: COM, EXM, CID, PAL, SSCL and VAT.",
      "Tikiri does not take an extra profit on this local process. Until a new bank account is open, project costs are expected to be funded from the DSL account.",
    ],
    handover: "Finance issues the approved B2C selling price for each SKU.",
    watch: "There is a local marketing advertising budget of LKR 300,000, expected to be paid on Ms. Gayara’s credit card, with Sachini processing it.",
    lanes: ["ship"],
  },
  {
    n: "11",
    title: "Put the products live on Shopify",
    owner: "Digital Marketing Executive · supervised by Sasini",
    starts: "Finance has the approved B2C price and Wattala stock is actually ready.",
    do: [
      "Upload the approved SKU, description, images and final price.",
      "Set opening inventory from the Warehouse Assistant’s confirmed receipt. Mark anything outside the approved list as out of stock.",
      "Drop products into the right Shopify collections.",
      "Set shipping and checkout with the correct courier charges.",
      "Check stock, landing pages and discount codes before any promotion goes live.",
      "Sync the catalogue with linked social platforms so listings stay the same everywhere.",
      "When tracking is set up, check product views, add-to-cart, checkout and purchase events in Google Tag Manager, GA4 and the ad pixels.",
    ],
    handover: "A live storefront with the right products, prices and availability. Orders can now start.",
    lanes: ["customers"],
  },
  {
    n: "12",
    title: "Turn marketing on — only when we can fulfil",
    owner: "Digital Marketing Executive for campaigns. Sasini for local marketing, and as backup.",
    starts: "Wattala can dispatch, and Shopify is live with products we can actually ship.",
    do: [
      "Plan, run and optimise Meta, Google and TikTok campaigns. Manage budgets, audiences, bidding and remarketing. Watch cost per acquisition and return on ad spend.",
      "Run organic posts on Facebook, Instagram, TikTok and Pinterest.",
      "List approved products on Daraz and Kapruka only with their own price lists. Do not assume Shopify will push them across.",
      "Plan influencers, email or SMS, and the right product-launch events. Sasini keeps the calendar of Sri Lankan exhibitions and fairs.",
      "Prepare weekly and monthly reports on spend, traffic, sales, conversion and acquisition cost, and say what should change.",
    ],
    handover: "Traffic and orders start flowing into the daily dispatch routine.",
    watch: "Do not turn paid campaigns on until Wattala can pick, pack and hand parcels to the courier the same working day.",
    lanes: ["customers"],
  },
  {
    n: "13",
    title: "Send the day’s orders and dispatch them",
    owner: "Digital Marketing Executive at Biyagama, Warehouse Assistant at Wattala, then the courier",
    starts: "A customer places a fully paid order on tikiritoys.lk.",
    do: [
      "The order lands as pending fulfilment. Nothing is picked until payment is confirmed. Pending, failed or flagged payments stay out of the list.",
      "Before 12:30 p.m., the Digital Marketing Executive reviews incoming Shopify orders: SKU, quantity, customer contact, delivery address and payment status. Incomplete orders are resolved or flagged.",
      "At 12:30 p.m., email the day’s order list to the Wattala Warehouse Assistant.",
      "Create one waybill per order in the courier account. Send one folder per order, containing the order details, the customer details, and the matching waybill.",
      "The Warehouse Assistant matches each order to its folder, picks and checks the SKU, quantity and condition, packs it, and attaches the matching waybill to the carton.",
      "Hold any parcel with a missing waybill, an address mismatch or a stock shortage. Tell the Digital Marketing Executive the same day. Do not hand that parcel to the courier.",
      "Record each order number and waybill the courier accepts. Send the courier handover documents to Biyagama before 5:00 p.m. Name any parcel still at Wattala, and why.",
      "When those documents arrive, the Digital Marketing Executive marks only the handed-over orders as fulfilled in Shopify. Unconfirmed orders stay open.",
    ],
    handover: "Tracking and a true fulfilment status sit with the Digital Marketing Executive for customer updates.",
    watch: "If the Digital Marketing Executive is not available before 12:30 p.m., escalate to Sasini. Fulfilment does not go ahead without the order list and a matching waybill. Only orders actually handed to the courier are marked fulfilled.",
    lanes: ["warehouse", "customers"],
  },
  {
    n: "14",
    title: "Follow delivery, handle complaints, and start again",
    owner: "Digital Marketing Executive for updates. Operations for escalation. Finance for refunds.",
    starts: "An order is dispatched, a delivery issue comes in, or stock movement says we need more.",
    do: [
      "Use the courier tracking number to check delivery. The Digital Marketing Executive updates the customer, including when Wattala reports a delay, a shortage or a missed collection.",
      "Customers currently reach us on mobile / WhatsApp 0773617771 and the Facebook / Instagram inbox. A dedicated customer-service email still needs to be created.",
      "Log every complaint before you act: date, channel, customer, contact, order number, category, description and status.",
      "Acknowledge quickly, gather evidence, categorise, then resolve or escalate. Safety concerns, repeat complaints, and refunds above the agreed threshold must be escalated.",
      "For a refund: Operations checks internally, Ms. Gayara and Mr. Dhevin approve, Operations instructs Executive Finance with Marketing copied, Finance verifies the bank and pays, Marketing tells the customer.",
      "Close the log with the resolution and the closing date. Produce a simple monthly summary by category and channel.",
      "Stock, sales and low-stock signals go back to Risina and Merchandising. The three-month cycle starts again at Step 01.",
    ],
    handover: "The operation returns to Step 01 whenever stock or demand needs another production run.",
    watch: "Birth-gift delays and rubber-item patches keep showing up as complaint themes — pay extra attention there. Birthday-gift special wishes are noted as a future service, not a live one.",
    lanes: ["customers", "ship"],
  },
];

export const handovers: { from: string; to: string; what: string }[] = [
  { from: "Risina", to: "Management, then Operations Executive", what: "The quantity list, first for approval, then as the approved list" },
  { from: "Operations Executive", to: "Merchandiser", what: "The purchase order, once customs approval and payment are both clear" },
  { from: "Merchandiser", to: "Production Planner", what: "The production order and the date materials will be ready" },
  { from: "Production Planner", to: "Merchandiser", what: "The confirmed delivery date" },
  { from: "Merchandiser", to: "Packing", what: "A request to pack the finished toys" },
  { from: "Packing", to: "Merchandiser", what: "Confirmation that packing is complete, plus the packing list to Shipping" },
  { from: "Merchandiser", to: "Operations Executive", what: "An update that the toys are packed" },
  { from: "Operations Executive", to: "Shipping", what: "A request to check clearance and arrange transport to Wattala" },
  { from: "Operations Executive", to: "Warehouse Assistant", what: "Receiving instructions for the Wattala transfer" },
  { from: "Warehouse Assistant", to: "Operations Executive", what: "The products and quantities actually received" },
  { from: "Digital Marketing Executive", to: "Warehouse Assistant", what: "The 12:30 p.m. order list, and one folder per order with its waybill" },
  { from: "Warehouse Assistant", to: "Courier", what: "The packed carton with the matching waybill attached" },
  { from: "Warehouse Assistant", to: "Digital Marketing Executive", what: "Courier handover documents, before 5:00 p.m." },
  { from: "Digital Marketing Executive", to: "Shopify", what: "Only the orders actually handed to the courier, marked fulfilled" },
];

export const day = [
  { when: "Any time", title: "Customer orders and pays", body: "The order enters Shopify as pending fulfilment. Nothing is picked until payment is confirmed." },
  { when: "Before 12:30 p.m.", title: "Biyagama reviews the orders", body: "The Digital Marketing Executive checks SKU, quantity, contact, address and payment. Incomplete orders are flagged, not sent." },
  { when: "12:30 p.m.", title: "The list and the folders go to Wattala", body: "One email with the day’s order list. Then one folder per order: order details, customer details, and the matching waybill." },
  { when: "Afternoon", title: "Wattala picks and packs", body: "The Warehouse Assistant picks the exact SKU, packs it, attaches the waybill, and holds anything that does not match." },
  { when: "Before 5:00 p.m.", title: "Courier proof comes back", body: "Handover documents go to the Digital Marketing Executive. Parcels still at Wattala are named, with the reason." },
  { when: "After the proof arrives", title: "Shopify is updated", body: "Only orders the courier actually took are marked fulfilled. The rest stay open." },
];

export const packingRules = [
  { n: "01", title: "Pack for real courier handling", body: "Protect for stacking, drops and bike delivery — not only for how it looks on a shelf." },
  { n: "02", title: "Right-size the parcel", body: "Oversized boxes inflate volumetric weight and courier cost. Use the smallest box that is still safe." },
  { n: "03", title: "One order, one parcel where you can", body: "Consolidate multi-item orders. If you must split, label clearly as 1 of 2 / 2 of 2 against the same order." },
  { n: "04", title: "Seal every seam", body: "Strong tape on open edges, so the parcel cannot open or look tampered with." },
  { n: "05", title: "Protect the waybill", body: "Place it flat on the top face. Never across a seam or a corner. It must match the folder for that order." },
  { n: "06", title: "Weigh and measure", body: "Record actual weight and dimensions before handover so we can check courier billing later." },
  { n: "07", title: "Include a packing slip", body: "The slip inside must match what is physically in the parcel." },
  { n: "08", title: "Final check", body: "Parcel condition, readable label, logged weight — then the courier can take it." },
];

export const station = [
  { purpose: "Standard parcels", material: "2–3 carton sizes", why: "Keeps volumetric weight and courier cost under control." },
  { purpose: "Single small item", material: "Padded poly mailer", why: "Cheaper and lighter when a full box is not needed." },
  { purpose: "Cushioning", material: "Paper fill or bubble wrap", why: "Protects against stacking and drops." },
  { purpose: "Sealing", material: "Strong packing tape", why: "Holds up to courier handling." },
  { purpose: "Label protection", material: "Clear waybill pouch", why: "Keeps paper labels readable, including in rain." },
  { purpose: "Packing station", material: "Scale and measuring tape", why: "So actual weight and size get recorded." },
  { purpose: "Inside every parcel", material: "Printed packing slip", why: "Matches the courier declaration to the contents." },
];

export const complaints = [
  { title: "Damaged or defective", body: "Ask for a photo, confirm the issue, then replace or refund." },
  { title: "Wrong item delivered", body: "Send the correct item and arrange return of the wrong one where needed." },
  { title: "Missing item", body: "Check the dispatch log, then send the missing piece or refund that value." },
  { title: "Late or failed delivery", body: "Check courier tracking, chase the courier, and give the customer a new ETA." },
  { title: "Quality / not as expected", body: "Compare against the product spec and resolve under the return approach." },
  { title: "Safety concern or child injury risk", body: "Escalate immediately, whatever channel it came in on. Do not sit on this." },
];

export const refunds = [
  { who: "Customer / Marketing", body: "The complaint is formally shared with the Operations Executive." },
  { who: "Operations Executive", body: "Checks the issue with the right teams and decides whether a refund should be proposed." },
  { who: "Management", body: "Ms. Gayara and Mr. Dhevin approve the refund decision." },
  { who: "Operations Executive", body: "Instructs Executive Finance to proceed. Marketing stays copied on the email." },
  { who: "Executive Finance", body: "Checks the bank statement and coordinates the refund." },
  { who: "Finance", body: "The method on file is a cheque in the customer’s name, deposited to the account they provide." },
  { who: "Marketing", body: "Confirms to the customer that the refund is done." },
  { who: "The team", body: "Decides case by case whether the physical product must come back." },
];

export const kpis = [
  { metric: "Stock accuracy", means: "System quantity vs physical count", target: "100%" },
  { metric: "Stockout rate", means: "SKUs out of stock as a % of active SKUs", target: "< 5%" },
  { metric: "RM on-time delivery", means: "Raw material at the factory by the agreed date", target: "> 90%" },
  { metric: "Production on-time rate", means: "Production finished by the planned date", target: "> 90%" },
  { metric: "PP sample approval cycle", means: "Working days from sample in to approval", target: "< 3 days" },
  { metric: "Reorder fulfilment lead time", means: "Days from PO until stock is available to sell", target: "Set per SKU — still to define" },
];

export const tools = [
  { name: "Shopify", body: "Sales history, catalogue, Wattala stock, orders, fulfilment status and customer notices." },
  { name: "Power BI", body: "Current stock reporting used by Data Analytics. Not the long-term inventory home." },
  { name: "Courier account", body: "Waybills created by the Digital Marketing Executive. Tracking and handover proof come back from Wattala." },
  { name: "Daraz / Kapruka", body: "Separate marketplace listings. Each needs its own price list." },
  { name: "Meta, Google, TikTok", body: "Paid campaigns run by the Digital Marketing Executive. Facebook and Instagram inbox also take complaints." },
  { name: "BOI / Sri Lanka Customs", body: "Local-sale approval, valuation, CUSDEC assessment and statutory settlement." },
];

export const stillOpen = [
  { title: "Inventory system", tag: "Proposed", body: "Choose a system that can hold stock, barcodes and Shopify in one place. Power BI stays the view until then." },
  { title: "Barcode process", tag: "Proposed", body: "Confirm the reader, and how it talks to the stock system, before anyone depends on it." },
  { title: "Customer-service email", tag: "Proposed", body: "Create the official address for delivery follow-up and complaints. WhatsApp 0773617771 is the live channel today." },
  { title: "Refund threshold", tag: "To confirm", body: "Name the value that needs higher-level approval. The notes say “above a set value” and never name it." },
  { title: "Reorder points", tag: "To confirm", body: "Set the reorder point and the lead-time target by SKU or category before the next three-month plan." },
  { title: "COD reconciliation", tag: "To confirm", body: "If cash on delivery is offered, write how courier cost and COD cash are matched." },
  { title: "Trial orders", tag: "Proposed", body: "Run test orders from checkout through courier handover before a full launch or a big campaign." },
  { title: "Birthday wishes", tag: "Proposed", body: "Define the special-wish service before it is promised in marketing. It is not live." },
  { title: "Wattala address and phone", tag: "To confirm", body: "The warehouse is Wattala. The street address and the on-site phone are not in the current notes. Write them in once confirmed. Do not keep using 273 Panchikawatta Road." },
];

export type Pending = {
  id: string;
  title: string;
  body: string;
};

export const pending: Pending[] = [
  {
    id: "cctv",
    title: "CCTV & security requirements",
    body: "Agree what Wattala needs: cameras on the door, the stock and the packing bench, who can view them, and how the warehouse is locked after the courier has left.",
  },
  {
    id: "computer",
    title: "Computer and internet connection",
    body: "Confirm Wattala has a working computer and a reliable connection, so order folders, waybills and the monthly count sheet can be opened on site.",
  },
  {
    id: "courier",
    title: "Courier account and delivery arrangement",
    body: "Confirm the account the Digital Marketing Executive uses for waybills, who collects from Wattala, and the proof the Warehouse Assistant must send before 5:00 p.m.",
  },
  {
    id: "humidifier",
    title: "Humidifier requirement for warehouse",
    body: "Decide whether Wattala needs a humidifier for plush and rubber, which unit, and who checks that it is running.",
  },
  {
    id: "shelves",
    title: "Labelled shelves",
    body: "Give every SKU a fixed, labelled location before the first receipt. Keep fast movers near packing and damaged units apart.",
  },
  {
    id: "bank",
    title: "New bank account requirement",
    body: "Open the account that will take tikiritoys.lk payments. Name who can view it, who reconciles it, and how it sits alongside the DSL account until it is live.",
  },
  {
    id: "roles",
    title: "New role implementation",
    body: "Hire and start the Digital Marketing Executive at Biyagama and the Warehouse Assistant at Wattala, against the job descriptions. Do not leave the 12:30 p.m. and 5:00 p.m. routine to whoever is free.",
  },
  {
    id: "standards",
    title: "Packing materials and dispatch standards",
    body: "Approve the carton sizes, mailers, fill, tape and waybill pouches, plus the eight packing checks. Name the supplier and the minimum stock to hold at Wattala.",
  },
  {
    id: "printer",
    title: "Printer for warehouse",
    body: "Put a printer at Wattala for packing slips, count sheets and a backup copy of the waybill. Waybills are still created in the courier account at Biyagama.",
  },
  {
    id: "shopify",
    title: "Shopify store and inventory setup",
    body: "Listings, approved prices, collections and courier charges live. Opening stock comes only from confirmed Wattala receipts, and each sale deducts it.",
  },
  {
    id: "access",
    title: "Staff access and backup coverage",
    body: "Shopify access, courier-account access and warehouse keys for the two new roles. Sasini backs up digital work. A named backup for the Warehouse Assistant is still missing.",
  },
  {
    id: "training",
    title: "Staff training",
    body: "Train both new roles, Sasini and the Operations Executive on receiving, the one-folder rule, the two daily deadlines, and what must not be marked fulfilled.",
  },
  {
    id: "climate",
    title: "Warehouse temperature and humidity control",
    body: "Set the range Wattala should hold, how often it is checked, and who logs it. This sits with the humidifier decision, not instead of it.",
  },
  {
    id: "payments",
    title: "Website payments and reconciliation",
    body: "Gateway live, the noted 3% processing charge inside the price, and a daily match of paid Shopify orders to the bank. Unpaid orders never go on the 12:30 p.m. list.",
  },
  {
    id: "scale",
    title: "Weighing scale",
    body: "A scale at the Wattala packing bench, so actual weight is written down before the courier bills us.",
  },
  {
    id: "tape",
    title: "Measuring tape",
    body: "A tape at the same bench, so parcel dimensions are recorded for volumetric weight.",
  },
  {
    id: "packing",
    title: "Packing",
    body: "Cartons, mailers, fill, tape and waybill pouches actually on the bench at Wattala, not only written into a standard. Dispatch should not wait on a supply run.",
  },
];

export const checkpoints = [
  { title: "Before production", body: "Product list and quantities confirmed by Management. Local-sale path is clear. Raw materials and packaging dates are known. PP sample need is identified." },
  { title: "Before the purchase order", body: "Customs approval and the payment then due are both clear. The PO lists SKU and quantity. Nothing is ordered on a verbal list." },
  { title: "Before goods leave the BOI zone", body: "Final packing list is complete. The assessment still matches. Finance has paid. Final BOI / Customs release is on file." },
  { title: "At Wattala receipt", body: "The Warehouse Assistant has checked SKU, quantity and condition. Gaps are isolated. The Operations Executive has the actual count. That count is the Shopify opening stock." },
  { title: "Before Shopify goes live", body: "B2C price is approved. Physical stock is confirmed. Courier fees are set. Product and collection data is correct." },
  { title: "Every fulfilment day", body: "12:30 p.m. list went out. One folder per order, with its own waybill. Handover proof is back before 5:00 p.m. Only collected orders are fulfilled in Shopify." },
  { title: "On a customer complaint", body: "It is logged. Operations is in the loop when they need to be. Approval is obtained before any refund. Closure is recorded." },
  { title: "Month end", body: "Physical count against Shopify, KPI review, complaint summary, courier issues, low-stock review, and this pending list." },
];
