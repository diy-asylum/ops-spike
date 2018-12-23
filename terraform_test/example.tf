provider "aws" {}

data "aws_ecr_repository" "diy-ecr-fe" {
  name = "frontend"
}

resource "aws_ecs_cluster" "diyasylum" {
  name = "diyasylum"
}

resource "aws_ecs_task_definition" "diyasylum-fe" {
  family = "diyasylum-fe"

  container_definitions = <<DEFINITION
[
  {
    "cpu": 2,
    "essential": true,
    "image": "${aws_ecr_repository.diy-ecr-fe.repository_url}/frontend",
    "memory": 4,
    "name": "diyasylum-fe",
    "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 80
                }
            ]
  }
]
DEFINITION
}

resource "aws_ecs_service" "mongo" {
  name          = "mongo"
  cluster       = "${aws_ecs_cluster.diyasylum.id}"
  desired_count = 1

  # Track the latest ACTIVE revision
  task_definition = "${aws_ecs_task_definition.diyasylum-fe.family}"
}
