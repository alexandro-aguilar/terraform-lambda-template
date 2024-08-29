terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "lambda1" {
  source = "../src/lambda/lambda1"
  function_name = "lambda1"
  environment_variables = {
    NODE_ENV = "production"
  }
}

module "lambda2" {
  source = "../src/lambda/lambda2"
  function_name = "lambda2"
  environment_variables = {
    NODE_ENV = "production"
  }
}