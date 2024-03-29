﻿$(function () {
    var l = abp.localization.getResource('HayraKosanlar');
    var createModal = new abp.ModalManager(abp.appPath + 'GiveAHandRequest/CreateModal');
    var editModal = new abp.ModalManager(abp.appPath + 'GiveAHandRequest/EditModal');
    var dataTable = $('#GiveAHandRequestsTable').DataTable(
        abp.libs.datatables.normalizeConfiguration({
            orderCellsTop: true,
            fixedHeader: true,
            paging: true,
            order: [[1, "asc"]],
            searching: true,
            scrollX: true,
            ajax: abp.libs.datatables.createAjax(hayraKosanlar.giveAHandRequests.giveAHandRequest.getList),
            columnDefs: [
                {
                    title: l('Name'),
                    data: "name",
                    searchable: "true"
                },
                {
                    title: l('Surname'),
                    data: "surname"
                },
                {
                    title: l('PhoneNumber'),
                    data: "phoneNumber"
                },
                {
                    title: l('ExtraInformation'),
                    data: "extraInformation"
                },
                {
                    title: l('CreationTime'), data: "creationTime",
                    render: function (data) {
                        return luxon
                            .DateTime
                            .fromISO(data, {
                                locale: abp.localization.currentCulture.name
                            }).toLocaleString(luxon.DateTime.DATETIME_SHORT);
                    }
                },
                {
                    title: l('Actions'),
                    rowAction: {
                        items:
                            [
                                {
                                    text: l('Edit'),
                                    visible: abp.auth.isGranted('HayraKosanlar.EditGiveAHandRequest'),
                                    action: function (data) {
                                        editModal.open({ id: data.record.id });
                                    }
                                }
                            ]
                    }
                }
            ]
        })
    );
    createModal.onResult(function () {
        dataTable.ajax.reload();
    });
    editModal.onResult(function () {
        dataTable.ajax.reload();
    });
    $('#NewGiveAHandRequestButton').click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});