# Financial Data Filtering App

A financial data filtering app to analyze and filter annual income statements for Apple Inc. (AAPL). The app fetches data from the [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements) and enables filtering, sorting, and responsive visualization of financial metrics.

## 🚀 Live Demo

[Deployed Application Link](https://valueglance-take-home.netlify.app/)

---

## 📚 Features

- **Data Display**: Fetches and displays annual financial data in a table format.
- **Filtering Options**:
  - **Date Range**: Filter results by specific years.
  - **Revenue Range**: View rows with revenue within a user-specified range.
  - **Net Income Range**: View rows with net income within a user-specified range.
- **Sorting**:
  - Sort by **Date**, **Revenue**, or **Net Income** (ascending/descending).
- **Responsive Design**: Fully functional on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Material UI
- **Deployment**: Deployed using [Netlify]([https://your-deployment-platform.com](https://valueglance-take-home.netlify.app/))

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (latest)
- npm or yarn
- API Key from [Financial Modeling Prep](https://site.financialmodelingprep.com/)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/bNTGeez/Value-Glance.git
   cd Value-Glance

   code .
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add your API key:
     ```env
     VITE_VALUEGLANCE_API_KEY=your_api_key_here
     ```

4. **Run the App Locally**
   ```bash
   npm run dev
   ```

5. **Build the App for Production**
   ```bash
   npm run build
   ```

6. **Deploy the App**
   - Deploy the contents of the `build` folder using [Netlify](https://www.netlify.com).

---

## 🧩 Usage Instructions

1. **Open the App**: Access the live application using the [link](https://your-deployed-app-link.com).
2. **View Financial Data**: The data table displays key metrics like Date, Revenue, Net Income, Gross Profit, EPS, and Operating Income.
3. **Filter Data**:
   - Set a **date range**, **revenue range**, or **net income range** to refine the data.
4. **Sort Data**: Click column headers to sort by Date, Revenue, or Net Income.
5. **Responsive Design**: Works seamlessly on mobile and desktop devices.

---

## 🧪 Testing Locally

Run the app and access it locally.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request for any improvements or fixes.

---

## 📧 Contact

For queries or feedback, please contact [tangbenjamin123@gmail.com](mailto:tangbenjamin123@gmail.com).

--- 
