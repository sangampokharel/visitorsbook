import React from "react";
import { Center, Modal, VStack, HStack, Text } from "native-base";
const ModalComponent = ({
  showModal,
  closeModal,

  name,
  email,
  address,
  mobile,
}) => {
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => closeModal()} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>{name}</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Email</Text>
                <Text color="blueGray.400">{email}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Address</Text>
                <Text color="green.500">{address}</Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Mobile</Text>
                <Text color="green.500">{mobile}</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button flex="1" onPress={() => {
            setShowModal2(true);
          }}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ModalComponent;
