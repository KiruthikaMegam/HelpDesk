export const agents = [
  "Unassigned",
  "Arun Kumar",
  "Divya S",
  "Karthik R",
  "Priya M",
  "Naveen K",
];

export const categories = [
  "Technical",
  "Billing",
  "Account",
  "Product",
  "Delivery",
  "General",
];

export const initialTickets = [
  {
    id: 1001,
    subject: "Unable to login to customer portal",
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    category: "Account",
    priority: "High",
    status: "Open",
    assignee: "Arun Kumar",
    description:
      "Customer is unable to sign in after resetting the account password.",
    createdAt: "2026-09-18T08:30:00",
    updatedAt: "2026-09-18T09:15:00",
    slaDue: "2026-09-18T12:30:00",
    attachments: ["login-error.png"],
    comments: [
      {
        id: 1,
        author: "Arun Kumar",
        text: "Checking the authentication logs.",
        time: "2026-09-18T09:00:00",
      },
    ],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-18T08:30:00",
      },
      {
        id: 2,
        text: "Assigned to Arun Kumar",
        time: "2026-09-18T08:45:00",
      },
    ],
  },

  {
    id: 1002,
    subject: "Payment deducted but order not confirmed",
    customer: "Sneha R",
    email: "sneha@gmail.com",
    phone: "9845123456",
    category: "Billing",
    priority: "Critical",
    status: "In Progress",
    assignee: "Divya S",
    description:
      "Payment was successful from customer bank account, but the order status remains pending.",
    createdAt: "2026-09-17T15:20:00",
    updatedAt: "2026-09-18T08:10:00",
    slaDue: "2026-09-18T10:00:00",
    attachments: ["payment-proof.jpg"],
    comments: [
      {
        id: 1,
        author: "Divya S",
        text: "Payment gateway reference has been verified.",
        time: "2026-09-18T07:45:00",
      },
    ],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-17T15:20:00",
      },
      {
        id: 2,
        text: "Priority changed to Critical",
        time: "2026-09-17T16:00:00",
      },
    ],
  },

  {
    id: 1003,
    subject: "Product delivered with damaged packaging",
    customer: "Vikram P",
    email: "vikram@gmail.com",
    phone: "9786452310",
    category: "Delivery",
    priority: "Medium",
    status: "Pending",
    assignee: "Karthik R",
    description:
      "Customer reported that the external packaging was damaged during delivery.",
    createdAt: "2026-09-16T11:10:00",
    updatedAt: "2026-09-17T13:25:00",
    slaDue: "2026-09-19T11:00:00",
    attachments: [],
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-16T11:10:00",
      },
    ],
  },

  {
    id: 1004,
    subject: "Application crashes while uploading image",
    customer: "Meena V",
    email: "meena@gmail.com",
    phone: "9123456780",
    category: "Technical",
    priority: "High",
    status: "Resolved",
    assignee: "Naveen K",
    description:
      "Mobile application closes while selecting a high resolution image.",
    createdAt: "2026-09-15T09:40:00",
    updatedAt: "2026-09-16T16:30:00",
    slaDue: "2026-09-16T18:00:00",
    attachments: ["crash-screen.png"],
    comments: [
      {
        id: 1,
        author: "Naveen K",
        text: "Image compression issue fixed in latest release.",
        time: "2026-09-16T15:50:00",
      },
    ],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-15T09:40:00",
      },
      {
        id: 2,
        text: "Ticket resolved",
        time: "2026-09-16T16:30:00",
      },
    ],
  },

  {
    id: 1005,
    subject: "Need invoice copy for previous purchase",
    customer: "Ashok Kumar",
    email: "ashok@gmail.com",
    phone: "9654321078",
    category: "Billing",
    priority: "Low",
    status: "Closed",
    assignee: "Priya M",
    description: "Customer needs invoice for an order placed last month.",
    createdAt: "2026-09-14T14:10:00",
    updatedAt: "2026-09-14T17:00:00",
    slaDue: "2026-09-15T14:00:00",
    attachments: [],
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-14T14:10:00",
      },
      {
        id: 2,
        text: "Invoice sent to customer",
        time: "2026-09-14T16:45:00",
      },
      {
        id: 3,
        text: "Ticket closed",
        time: "2026-09-14T17:00:00",
      },
    ],
  },

  {
    id: 1006,
    subject: "Unable to update profile phone number",
    customer: "Sanjay T",
    email: "sanjay@gmail.com",
    phone: "9000012345",
    category: "Account",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
    description:
      "Save button does not respond after changing the mobile number.",
    createdAt: "2026-09-18T07:20:00",
    updatedAt: "2026-09-18T07:20:00",
    slaDue: "2026-09-19T07:20:00",
    attachments: [],
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        time: "2026-09-18T07:20:00",
      },
    ],
  },
];