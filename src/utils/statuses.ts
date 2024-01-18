export enum StatusEnum {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  ServerError = 500,
  NotFound = 404,
  Conflict = 409,
}

function handleStatusEnum(status: StatusEnum) {
  // Access enum values using dot notation
  if (status === StatusEnum.Success) {
    // Handle success
  }
}

interface StatusDetails {
  success: boolean;
  message?: string; // Optional message
  data?: any; // Optional data on success
  error?: any; // Optional error information on failure
}
