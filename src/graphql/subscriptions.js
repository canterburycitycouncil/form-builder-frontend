/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm {
    onCreateForm {
      id
      name
      conditions
      fees
      lists
      metadata
      outputs
      sections
      skipSummary
      startPage
      version
      pages
      totalSubs
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm {
    onUpdateForm {
      id
      name
      conditions
      fees
      lists
      metadata
      outputs
      sections
      skipSummary
      startPage
      version
      pages
      totalSubs
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm {
    onDeleteForm {
      id
      name
      conditions
      fees
      lists
      metadata
      outputs
      sections
      skipSummary
      startPage
      version
      pages
      totalSubs
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      parentID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      parentID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      parentID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubmission = /* GraphQL */ `
  subscription OnCreateSubmission {
    onCreateSubmission {
      id
      subID
      userID
      user {
        id
        email
        firstName
        lastName
        address
        contactNumber
        createdAt
        updatedAt
      }
      formID
      values
      status
      startDate
      submissionDate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubmission = /* GraphQL */ `
  subscription OnUpdateSubmission {
    onUpdateSubmission {
      id
      subID
      userID
      user {
        id
        email
        firstName
        lastName
        address
        contactNumber
        createdAt
        updatedAt
      }
      formID
      values
      status
      startDate
      submissionDate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubmission = /* GraphQL */ `
  subscription OnDeleteSubmission {
    onDeleteSubmission {
      id
      subID
      userID
      user {
        id
        email
        firstName
        lastName
        address
        contactNumber
        createdAt
        updatedAt
      }
      formID
      values
      status
      startDate
      submissionDate
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      firstName
      lastName
      address
      contactNumber
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      firstName
      lastName
      address
      contactNumber
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      firstName
      lastName
      address
      contactNumber
      createdAt
      updatedAt
    }
  }
`;
