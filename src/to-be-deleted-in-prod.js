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