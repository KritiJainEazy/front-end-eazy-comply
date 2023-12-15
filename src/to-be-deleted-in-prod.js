<Router>  
<PageLayout>
  {" "}
  <Routes>
    <Route path="login" element={<LoginPage />} />

    <Route path="home" index element={<HomePage />} />

    <Route path="seekJobs" element={<SeekJobs />}>
      <Route
        index
        element={
          <PrivateRoute>
            <SeekJobsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="create"
        element={
          <PrivateRoute>
            <CreateJobPortfolio />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path="seekWorkers" element={<SeekWorkers />}>
      <Route
        index
        element={
          <PrivateRoute>
            <CandidateList />
          </PrivateRoute>
        }
      />
      <Route
        path="create"
        element={
          <PrivateRoute>
            <CreateJobOpportunity />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path="/" element={<Navigate to="/home" />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</PageLayout>
</Router>




















const res = {
  userType: {
    value: "",
    isValid: true,
    isRequired: true,
  },
  firstName: {
    value: "",
    isValid: true,
    isRequired: true,
  },
  lastName: {
    value: "",
    isValid: true,
    isRequired: true,
  },
  name: {
    value: "",
    isValid: true,
    isRequired: true,
  },
  email: {
    value: "",
    isValid: true,
    isRequired: true,
  },
  password: {
    value: "",
    isValid: true,
    isRequired: true,
  },
};
const FIELD_NAMES = {
  USER_TYPE: "userType",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
};